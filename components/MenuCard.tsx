import { MenuItem } from '@/types'

interface MenuCardProps {
  item: MenuItem
}

export default function MenuCard({ item }: MenuCardProps) {
  const imageUrl = item.metadata?.dish_image?.imgix_url
    ? `${item.metadata.dish_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`
    : 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format'

  return (
    <div className="card group overflow-hidden">
      {/* Image */}
      <div className="aspect-w-16 aspect-h-12 overflow-hidden">
        <img
          src={imageUrl}
          alt={item.metadata.dish_name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          width={400}
          height={256}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-xl font-semibold text-gray-800 line-clamp-2">
            {item.metadata.dish_name}
          </h4>
          <span className="text-2xl font-bold text-gold-600 ml-4 flex-shrink-0">
            {item.metadata.price}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {item.metadata.description}
        </p>

        {/* Allergens */}
        {item.metadata.allergens && (
          <div className="border-t border-cream-200 pt-4">
            <p className="text-xs text-gray-500">
              <span className="font-medium">Allergènes :</span>{' '}
              {item.metadata.allergens}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}