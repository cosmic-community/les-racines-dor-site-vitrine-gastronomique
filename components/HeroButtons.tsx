'use client'

export default function HeroButtons() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <button
        onClick={() => scrollToSection('menu')}
        className="btn-primary text-lg px-8 py-4"
      >
        Découvrir le Menu
      </button>
      
      <button
        onClick={() => scrollToSection('contact')}
        className="btn-secondary text-lg px-8 py-4"
      >
        Réserver une Table
      </button>
    </>
  )
}