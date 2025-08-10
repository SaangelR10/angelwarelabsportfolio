'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const steps = [
  { title: 'Discovery', desc: 'Objetivos, alcance y KPIs' },
  { title: 'UX/UI', desc: 'Wireframes y diseño' },
  { title: 'Desarrollo', desc: 'Frontend + Backend + Integraciones' },
  { title: 'QA & Medición', desc: 'Pruebas y observabilidad' },
  { title: 'Deploy & Soporte', desc: 'CD/monitoring y mejoras continuas' },
]

const Process = () => {
  return (
    <section id="process" className="section-padding gradient-bg overflow-x-hidden">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Nuestro <span className="gradient-text">Proceso</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="p-5 rounded-2xl border border-dark-700 bg-dark-800/40 text-center"
            >
              <div className="text-lg font-semibold text-white">{s.title}</div>
              <div className="text-sm text-gray-300 mt-1">{s.desc}</div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex justify-center mt-4">
                  <ArrowRight className="w-5 h-5 text-primary-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process


