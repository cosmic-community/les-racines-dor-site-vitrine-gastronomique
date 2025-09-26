'use client'

export default function HeroButtons() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-8">
      <button
        onClick={() => scrollToSection('menu')}
        className="btn-primary text-lg px-8 py-4 w-full sm:w-auto text-center"
      >
        Découvrir le Menu
      </button>
      
      <button
        onClick={() => scrollToSection('contact')}
        className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto text-center"
      >
        Réserver une Table
      </button>
    </div>
  )
}