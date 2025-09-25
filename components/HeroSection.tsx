import { getRestaurantInfo } from '@/lib/cosmic'
import { RestaurantInfo } from '@/types'
import HeroButtons from '@/components/HeroButtons'

export default async function HeroSection() {
  const restaurantInfo = await getRestaurantInfo() as RestaurantInfo

  if (!restaurantInfo) {
    return (
      <section id="hero" className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Les Racines d'Or
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Restaurant gastronomique au cœur de la ville
          </p>
        </div>
      </section>
    )
  }

  const heroImageUrl = restaurantInfo.metadata?.hero_image?.imgix_url
    ? `${restaurantInfo.metadata.hero_image.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`
    : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop&auto=format'

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImageUrl}
          alt={restaurantInfo.metadata.name || 'Restaurant'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            {restaurantInfo.metadata.name}
          </h1>
          
          <div className="prose prose-lg prose-invert max-w-3xl mx-auto mb-8 animate-slide-up">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: restaurantInfo.metadata.description || '' 
              }} 
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <HeroButtons />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}