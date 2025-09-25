import { getMenuByCategory } from '@/lib/cosmic'
import { MenuItem } from '@/types'
import MenuCard from '@/components/MenuCard'

export default async function MenuSection() {
  const menuByCategory = await getMenuByCategory()

  const categories = [
    { key: 'entrees', name: 'Entrées', items: menuByCategory.entrees || [] },
    { key: 'plats', name: 'Plats Principaux', items: menuByCategory.plats || [] },
    { key: 'desserts', name: 'Desserts', items: menuByCategory.desserts || [] },
  ]

  return (
    <section id="menu" className="section-padding bg-cream-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Notre Menu
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos créations culinaires raffinées, élaborées avec passion 
            à partir des meilleurs produits locaux et de saison.
          </p>
        </div>

        {categories.map((category, categoryIndex) => (
          <div key={category.key} className="mb-16 last:mb-0">
            <h3 className="text-3xl font-semibold text-center text-gradient mb-12">
              {category.name}
            </h3>
            
            {category.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item: MenuItem, index: number) => (
                  <div
                    key={item.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${(categoryIndex * 0.1) + (index * 0.1)}s` }}
                  >
                    <MenuCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>Aucun plat disponible dans cette catégorie pour le moment.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}