'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { caseStudies } from '@/data/caseStudies'

const CaseStudies = () => {
  return (
    <section id="case-studies" className="section-padding gradient-bg overflow-x-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Casos de <span className="gradient-text">Estudio</span>
          </h2>
          <p className="text-lg text-gray-300 mt-3 max-w-3xl mx-auto">
            Ejemplos reales de cómo impulsamos resultados con diseño, tecnología y datos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="bg-dark-800/50 border border-dark-700 rounded-2xl overflow-hidden hover:border-primary-500/30 transition-all duration-300"
            >
              <div className="relative h-40">
                <Image src={c.image} alt={c.title} fill className="object-cover" />
              </div>
              <div className="p-6 space-y-4">
                <div className="text-xs text-gray-400">{c.client} • {c.industry}</div>
                <h3 className="text-xl font-bold text-white">{c.title}</h3>
                <p className="text-gray-300">{c.challenge}</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {c.solution.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {c.results.map((r) => (
                    <div key={r.label} className="text-center">
                      <div className="text-lg font-bold gradient-text">{r.value}</div>
                      <div className="text-xs text-gray-400">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-6 pb-6">
                <button
                  onClick={() => window.dispatchEvent(new Event('openConsultation'))}
                  className="button-primary w-full"
                >
                  Agendar Consulta
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies


