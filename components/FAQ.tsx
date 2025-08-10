'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const faqs = [
  {
    q: '¿Cuánto tarda un proyecto web típico?',
    a: 'Depende del alcance, pero un sitio corporativo suele tardar 4–8 semanas; productos a medida 8–16 semanas.'
  },
  {
    q: '¿Trabajan contrato de soporte?',
    a: 'Sí. Ofrecemos planes de soporte/retainer con SLAs y paquetes de horas mensuales.'
  },
  {
    q: '¿Pueden migrar un proyecto existente?',
    a: 'Sí. Evaluamos el estado actual, proponemos roadmap y migramos minimizando el downtime.'
  }
]

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="section-padding gradient-bg overflow-x-hidden">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Preguntas <span className="gradient-text">Frecuentes</span>
          </h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border border-dark-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-4 py-3 bg-dark-800/50 hover:bg-dark-700/50 text-white"
                aria-expanded={open === i}
              >
                {f.q}
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={open === i ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                className="px-4 overflow-hidden"
              >
                <div className="py-3 text-gray-300">{f.a}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ


