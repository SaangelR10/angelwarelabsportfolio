'use client'

import Image from 'next/image'
import { clientLogos } from '@/data/clients'

// Logos de marcas reconocidas desde SimpleIcons CDN (SVG renderizado como PNG por Next Image)
const logos = clientLogos

const Row = ({ reverse = false }: { reverse?: boolean }) => {
  const items = [...logos, ...logos]
  return (
    <div className="relative w-full overflow-hidden">
      <div className={`${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} whitespace-nowrap flex gap-16 will-change-transform`}
           style={{ width: '200%' }}>
        {items.map((src, idx) => (
          <div key={`${src}-${idx}`} className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-[180px] h-[64px] md:w-[220px] md:h-[72px] flex items-center justify-center">
              <Image src={src} alt={`Logo ${idx + 1}`} width={220} height={72} className="object-contain" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ClientLogos = () => {
  return (
    <section id="clients" className="section-padding px-0 gradient-bg overflow-x-hidden">
      <div className="w-screen mx-auto">
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-full px-4 py-1">
            <span className="w-2 h-2 rounded-full bg-primary-500" />
            <span className="text-xs text-gray-300 tracking-wide">Confianza y trayectoria</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold">
            <span className="text-white">Marcas que </span>
            <span className="gradient-text">confían en nosotros</span>
          </h3>
        </div>
        <Row />
      </div>
    </section>
  )
}

export default ClientLogos


