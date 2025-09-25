import { getTestimonials } from '@/lib/cosmic'
import { Testimonial } from '@/types'
import TestimonialCard from '@/components/TestimonialCard'

export default async function TestimonialSection() {
  const testimonials = await getTestimonials() as Testimonial[]

  return (
    <section id="testimonials" className="section-padding bg-cream-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Ce que disent nos clients
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les expériences exceptionnelles vécues par nos clients 
            lors de leurs passages aux Racines d'Or.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p>Témoignages non disponibles pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}