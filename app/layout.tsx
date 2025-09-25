import type { Metadata } from 'next'
import './globals.css'
import CosmicBadge from '@/components/CosmicBadge'

export const metadata: Metadata = {
  title: 'Les Racines d\'Or - Restaurant Gastronomique',
  description: 'Découvrez une expérience culinaire raffinée au cœur de la ville. Restaurant gastronomique contemporain avec une ambiance chaleureuse et élégante.',
  keywords: 'restaurant gastronomique, cuisine française, Paris, Antoine Dubois, gastronomie, fine dining',
  authors: [{ name: 'Les Racines d\'Or' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Les Racines d\'Or - Restaurant Gastronomique',
    description: 'Expérience culinaire raffinée avec le Chef Antoine Dubois',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}