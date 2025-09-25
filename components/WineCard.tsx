import { Wine } from '@/types'

interface WineCardProps {
  wine: Wine
}

export default function WineCard({ wine }: WineCardProps) {
  const wineTypeColors = {
    champagne: 'bg-yellow-100 text-yellow-800',
    blanc: 'bg-green-100 text-green-800',
    rouge: 'bg-red-100 text-red-800',
    rose: 'bg-pink-100 text-pink-800',
  }

  const typeColor = wineTypeColors[wine.metadata.wine_type?.key as keyof typeof wineTypeColors] || 'bg-gray-100 text-gray-800'

  return (
    <div className="card group">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gold-600 transition-colors duration-200">
              {wine.metadata.wine_name}
            </h3>
            
            <div className="flex items-center space-x-3 mb-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColor}`}>
                {wine.metadata.wine_type?.value || 'Vin'}
              </span>
              
              {wine.metadata.vintage && (
                <span className="text-sm text-gray-500 font-medium">
                  {wine.metadata.vintage}
                </span>
              )}
            </div>
          </div>
          
          <div className="text-right ml-4">
            <span className="text-2xl font-bold text-gold-600">
              {wine.metadata.price}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {wine.metadata.description}
        </p>

        {/* Food Pairing */}
        {wine.metadata.food_pairing && (
          <div className="border-t border-cream-200 pt-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">
              Accords mets et vins
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {wine.metadata.food_pairing}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}