import { Suspense } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import MenuSection from '@/components/MenuSection'
import ChefSection from '@/components/ChefSection'
import TeamSection from '@/components/TeamSection'
import WineSection from '@/components/WineSection'
import TestimonialSection from '@/components/TestimonialSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <MenuSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <ChefSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <TeamSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <WineSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <TestimonialSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <ContactSection />
      </Suspense>
      
      <Footer />
    </main>
  )
}