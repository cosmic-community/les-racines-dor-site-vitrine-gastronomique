export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-800 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Restaurant Name */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Les Racines d'Or
            </h3>
            <p className="text-green-100">
              Restaurant gastronomique au cœur de Paris, 
              une expérience culinaire raffinée.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-green-100">
              <li>
                <button
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-gold-300 transition-colors duration-200"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('chef')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-gold-300 transition-colors duration-200"
                >
                  Chef
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-gold-300 transition-colors duration-200"
                >
                  Équipe
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-gold-300 transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Restaurant Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Informations</h4>
            <div className="space-y-2 text-green-100">
              <p>25 Boulevard des Gourmets</p>
              <p>75001 Paris, France</p>
              <p>+33 1 42 36 89 12</p>
              <p>contact@lesracinesdor.fr</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-12 pt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-green-100 text-sm">
              © {currentYear} Les Racines d'Or. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm text-green-100">
              <button className="hover:text-gold-300 transition-colors duration-200">
                Politique de confidentialité
              </button>
              <button className="hover:text-gold-300 transition-colors duration-200">
                Mentions légales
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}