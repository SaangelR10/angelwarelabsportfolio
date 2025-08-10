import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, JetBrains_Mono as JetBrainsMono } from 'next/font/google'
import './globals.css'
import ParticlesGate from '@/components/ParticlesGate'
import GlobalConsultation from '@/components/GlobalConsultation'
import LoadingScreen from '@/components/LoadingScreen'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrainsMono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  title: 'Angelware Labs - Desarrollo Web y Soluciones Tecnológicas',
  description: 'Somos una empresa líder en desarrollo web, aplicaciones móviles y soluciones tecnológicas innovadoras. Transformamos ideas en experiencias digitales excepcionales.',
  keywords: 'desarrollo web, aplicaciones móviles, soluciones tecnológicas, React, Next.js, TypeScript',
  authors: [{ name: 'Angelware Labs' }],
  creator: 'Angelware Labs',
  publisher: 'Angelware Labs',
  robots: 'index, follow',
  metadataBase: new URL('https://angelwarelabs.com'),
  themeColor: '#0f172a',
  openGraph: {
    title: 'Angelware Labs - Desarrollo Web y Soluciones Tecnológicas',
    description: 'Transformamos ideas en experiencias digitales excepcionales',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Angelware Labs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Angelware Labs - Desarrollo Web y Soluciones Tecnológicas',
    description: 'Transformamos ideas en experiencias digitales excepcionales',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} ${jetbrainsMono.variable} bg-dark-900 text-white antialiased relative`}>
        {/* reCAPTCHA v3 */}
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
          />
        )}
        <LoadingScreen />
        <div className="fixed inset-0 overflow-hidden">
          <ParticlesGate />
        </div>
        <div id="app-content" className="relative z-10">
          {children}
        </div>
        <GlobalConsultation />
        {/* JSON-LD Organization y WebSite */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Angelware Labs',
              url: 'https://angelwarelabs.com',
              logo: 'https://angelwarelabs.com/og-image.jpg',
              sameAs: [
                'https://github.com/angelwarelabs',
                'https://www.linkedin.com/company/angelwarelabs',
                'https://twitter.com/angelwarelabs',
                'https://instagram.com/angelware.labs',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Angelware Labs',
              url: 'https://angelwarelabs.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://angelwarelabs.com/?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </body>
    </html>
  )
} 