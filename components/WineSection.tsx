import { getWines } from '@/lib/cosmic'
import { Wine } from '@/types'
import WineCard from '@/components/WineCard'

export default async function WineSection() {
  const wines = await getWines() as Wine[]

  return (
    <section id="wines" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Notre Cave
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre sélection de vins d'exception, soigneusement choisie 
            pour accompagner parfaitement nos créations culinaires.
          </p>
        </div>

        {wines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wines.map((wine, index) => (
              <div
                key={wine.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <WineCard wine={wine} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p>Sélection de vins non disponible pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}