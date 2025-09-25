import { getChef } from '@/lib/cosmic'
import { Chef } from '@/types'

export default async function ChefSection() {
  const chef = await getChef() as Chef

  if (!chef) {
    return (
      <section id="chef" className="section-padding bg-white">
        <div className="container-max text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Notre Chef
          </h2>
          <p className="text-xl text-gray-600">
            Informations du chef non disponibles pour le moment.
          </p>
        </div>
      </section>
    )
  }

  const chefImageUrl = chef.metadata?.portrait?.imgix_url
    ? `${chef.metadata.portrait.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`
    : 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&h=800&fit=crop&auto=format'

  const specialties = chef.metadata?.specialties?.split('\n') || []

  return (
    <section id="chef" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Notre Chef
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Chef Image */}
          <div className="animate-fade-in">
            <div className="relative">
              <img
                src={chefImageUrl}
                alt={chef.metadata.full_name}
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                width={500}
                height={500}
              />
              <div className="absolute -bottom-6 -right-6 bg-gold-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
                {chef.metadata.title}
              </div>
            </div>
          </div>

          {/* Chef Info */}
          <div className="space-y-6 animate-slide-up">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {chef.metadata.full_name}
              </h3>
              <p className="text-xl text-gold-600 font-medium mb-6">
                {chef.metadata.title}
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: chef.metadata.biography || '' 
                }} 
              />
            </div>

            {specialties.length > 0 && (
              <div className="mt-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Spécialités
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specialties.map((specialty, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-gray-600"
                    >
                      <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                      <span>{specialty.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}