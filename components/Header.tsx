'use client'

import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navigationItems = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Menu', href: '#menu' },
    { label: 'Chef', href: '#chef' },
    { label: 'Équipe', href: '#team' },
    { label: 'Vins', href: '#wines' },
    { label: 'Témoignages', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('nav')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white/90 backdrop-blur-sm'
    } border-b border-cream-200`}>
      <nav className="container-max mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('#hero')}
              className="text-xl md:text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-200"
            >
              Les Racines d'Or
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6 lg:space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-gold-600 px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gold-600 p-2 rounded-md transition-colors duration-200 relative z-50"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute top-1 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}></span>
                <span className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`absolute top-5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden absolute left-0 right-0 top-full bg-white/95 backdrop-blur-sm border-b border-cream-200 shadow-lg transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}>
          <div className="px-4 py-6 space-y-3">
            {navigationItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`text-gray-700 hover:text-gold-600 block w-full text-left px-4 py-3 text-lg font-medium transition-all duration-200 rounded-lg hover:bg-cream-100 ${
                  isMenuOpen ? 'animate-slide-up' : ''
                }`}
                style={{
                  animationDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>
    </header>
  )
}