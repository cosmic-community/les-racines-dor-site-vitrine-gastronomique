import { getRestaurantInfo } from '@/lib/cosmic'
import { RestaurantInfo } from '@/types'
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi'

export default async function ContactSection() {
  const restaurantInfo = await getRestaurantInfo() as RestaurantInfo

  if (!restaurantInfo) {
    return (
      <section id="contact" className="section-padding bg-white">
        <div className="container-max text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nous Contacter
          </h2>
          <p className="text-xl text-gray-600">
            Informations de contact non disponibles pour le moment.
          </p>
        </div>
      </section>
    )
  }

  const addressLines = restaurantInfo.metadata.address?.split('\n') || []
  const hoursLines = restaurantInfo.metadata.hours?.split('\n') || []

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nous Contacter
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Réservez votre table pour vivre une expérience gastronomique inoubliable 
            au cœur de Paris.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Informations de Contact
              </h3>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                    <FiPhone className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Téléphone</h4>
                    <p className="text-gray-600">{restaurantInfo.metadata.phone}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                    <FiMail className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">{restaurantInfo.metadata.email}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                    <FiMapPin className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Adresse</h4>
                    <div className="text-gray-600">
                      {addressLines.map((line, index) => (
                        <p key={index}>{line.trim()}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                    <FiClock className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Horaires</h4>
                    <div className="text-gray-600">
                      {hoursLines.map((line, index) => (
                        <p key={index}>{line.trim()}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation CTA */}
          <div className="flex items-center">
            <div className="card p-8 w-full text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Réservation
              </h3>
              
              <div className="mb-8">
                <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPhone className="w-10 h-10 text-gold-600" />
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Pour réserver votre table et vivre une expérience gastronomique 
                  exceptionnelle, contactez-nous directement par téléphone.
                </p>
                
                <a 
                  href={`tel:${restaurantInfo.metadata.phone}`}
                  className="btn-primary inline-flex items-center space-x-2 text-lg"
                >
                  <FiPhone className="w-5 h-5" />
                  <span>Appeler maintenant</span>
                </a>
              </div>

              <div className="border-t border-cream-200 pt-6">
                <p className="text-sm text-gray-500">
                  Réservation recommandée • Tables disponibles selon disponibilité
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}