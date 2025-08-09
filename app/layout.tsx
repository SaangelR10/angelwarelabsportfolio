import type { Metadata } from 'next'
import { Inter, JetBrains_Mono as JetBrainsMono } from 'next/font/google'
import './globals.css'
import Particles from '@/components/Particles'
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} ${jetbrainsMono.variable} bg-dark-900 text-white antialiased relative`}>
        <LoadingScreen />
        <div className="fixed inset-0 overflow-hidden">
          <Particles />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
} 