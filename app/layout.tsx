import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Angelware Labs - Desarrollo Web y Soluciones Tecnológicas',
  description: 'Somos una empresa líder en desarrollo web, aplicaciones móviles y soluciones tecnológicas innovadoras. Transformamos ideas en experiencias digitales excepcionales.',
  keywords: 'desarrollo web, aplicaciones móviles, soluciones tecnológicas, React, Next.js, TypeScript',
  authors: [{ name: 'Angelware Labs' }],
  creator: 'Angelware Labs',
  publisher: 'Angelware Labs',
  robots: 'index, follow',
  openGraph: {
    title: 'Angelware Labs - Desarrollo Web y Soluciones Tecnológicas',
    description: 'Transformamos ideas en experiencias digitales excepcionales',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Angelware Labs - Desarrollo Web y Soluciones Tecnológicas',
    description: 'Transformamos ideas en experiencias digitales excepcionales',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-dark-900 text-white antialiased`}>
        {children}
      </body>
    </html>
  )
} 