'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: 'Desde $1.5K',
    description: 'Landing o sitio básico optimizado, ideal para comenzar.',
    features: [
      'Next.js + SEO básico',
      'Diseño responsivo',
      'Formulario de contacto',
      'Deploy en Vercel',
    ],
    cta: 'Empezar',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 'Desde $5K',
    description: 'Web/app con funcionalidades a medida y performance premium.',
    features: [
      'UX/UI personalizado',
      'Integraciones (API/DB)',
      'Analítica y pruebas A/B',
      'Soporte prioritario',
    ],
    cta: 'Solicitar propuesta',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'A medida',
    description: 'Soluciones escalables, seguridad avanzada y soporte dedicado.',
    features: [
      'Arquitectura escalable',
      'CI/CD y monitoreo',
      'SLA y soporte 24/7',
      'Auditoría y compliance',
    ],
    cta: 'Agendar discovery',
    highlighted: false,
  },
]

const Pricing = () => {
  return (
    <section id="pricing" className="section-padding gradient-bg overflow-x-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Planes y <span className="gradient-text">Precios</span>
          </h2>
          <p className="text-lg text-gray-300 mt-3 max-w-3xl mx-auto">
            Transparencia y flexibilidad. Elige el plan que mejor se adapta a tu etapa.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className={`rounded-2xl border ${
                p.highlighted ? 'border-primary-500/50 bg-dark-800/70' : 'border-dark-700 bg-dark-800/40'
              } p-6`}
            >
              <div className="text-sm text-gray-400">{p.name}</div>
              <div className="text-3xl font-bold text-white mt-1">{p.price}</div>
              <p className="text-gray-300 mt-2">{p.description}</p>
              <ul className="space-y-2 mt-4">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-200">
                    <Check className="w-4 h-4 text-primary-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <button
                  onClick={() => window.dispatchEvent(new Event('openConsultation'))}
                  className={`w-full ${p.highlighted ? 'button-primary' : 'button-secondary'}`}
                >
                  {p.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing


