import { Testimonial } from '@/types'
import { getRatingNumber } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const rating = getRatingNumber(testimonial.metadata.rating)
  const visitDate = testimonial.metadata.visit_date
    ? new Date(testimonial.metadata.visit_date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < rating
      return (
        <svg
          key={index}
          className={`w-5 h-5 ${filled ? 'text-gold-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            clipRule="evenodd"
          />
        </svg>
      )
    })
  }

  return (
    <div className="card h-full">
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex space-x-1">
            {renderStars(rating)}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({rating}/5)
          </span>
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
          "{testimonial.metadata.testimonial_text}"
        </blockquote>

        {/* Client Info */}
        <div className="border-t border-cream-200 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">
                {testimonial.metadata.client_name}
              </p>
              {visitDate && (
                <p className="text-sm text-gray-500 mt-1">
                  Visite du {visitDate}
                </p>
              )}
            </div>
            
            {/* Quote Icon */}
            <div className="text-gold-300">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}