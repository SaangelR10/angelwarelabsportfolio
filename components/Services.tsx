'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Globe, Smartphone, Code, Database, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react'
import { servicesData } from '@/data/services'
import ServiceModal from './ServiceModal'
import MobileModal from './MobileModal'

import ConsultationModal from './ConsultationModal'

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedService, setSelectedService] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const services = servicesData.map((s) => ({
    ...s,
    icon:
      s.icon === 'Globe' ? Globe :
      s.icon === 'Smartphone' ? Smartphone :
      s.icon === 'Code' ? Code :
      s.icon === 'Database' ? Database :
      s.icon === 'Shield' ? Shield :
      Zap,
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const handleServiceClick = useCallback((service: any) => {
    setSelectedService(service)
    setIsModalOpen(true)
    window.location.hash = `servicios/${service.id}`
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedService(null)
    window.location.hash = 'servicios'
  }, [])

  // Detectar cambios en la URL y abrir el modal correspondiente
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash
      if (hash.startsWith('#servicios/')) {
        const serviceId = hash.replace('#servicios/', '')
        const service = services.find(s => s.id === serviceId)
        if (service) {
          setSelectedService(service)
          setIsModalOpen(true)
        }
      } else if (hash === '#servicios' || hash === '') {
        setIsModalOpen(false)
        setSelectedService(null)
      }
    }

    // Verificar hash inicial
    checkHash()

    // Escuchar cambios en el hash
    const handleHashChange = () => {
      checkHash()
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [services])

  return (
    <section id="services" className="section-padding gradient-bg overflow-x-hidden">
      <div className="container-custom">
        {/* JSON-LD de servicios para rich results */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': services.map((s) => ({
                '@type': 'Service',
                name: s.title,
                description: s.description,
                provider: {
                  '@type': 'Organization',
                  name: 'Angelware Labs',
                  url: 'https://angelwarelabs.com',
                },
                areaServed: 'Worldwide',
                serviceType: s.title,
                offers: {
                  '@type': 'Offer',
                  availability: 'https://schema.org/InStock',
                  priceSpecification: {
                    '@type': 'PriceSpecification',
                    priceCurrency: 'USD',
                  },
                },
              })),
            }),
          }}
        />
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Nuestros <span className="gradient-text">Servicios</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Ofrecemos soluciones tecnológicas integrales que impulsan el crecimiento 
            de tu negocio con tecnología de vanguardia y diseño excepcional.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-8 hover:border-primary-500/30 transition-all duration-300 card-hover"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA accesible */}
              <button
                type="button"
                onClick={() => handleServiceClick(service)}
                className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-300 group-hover:translate-x-2 transition-transform duration-300 p-3 rounded-lg hover:bg-primary-500/10 active:bg-primary-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label={`Saber más sobre ${service.title}`}
              >
                <span className="text-sm font-medium">Saber más</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event('openConsultation'))}
                  className="button-secondary text-sm"
                  aria-label={`Agendar consulta sobre ${service.title}`}
                >
                  Agendar Consulta
                </button>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsConsultationOpen(true)}
            className="button-primary"
          >
            Solicitar Consulta Gratuita
          </motion.button>
        </motion.div>
      </div>

      {/* Modal (uno u otro segun viewport) */}
      {selectedService && (
        <>
          <div className="hidden sm:block">
            <ServiceModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              service={selectedService}
            />
          </div>
          <div className="sm:hidden">
            <MobileModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              service={selectedService}
            />
          </div>
        </>
      )}
      
      
      
      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
      

    </section>
  )
}

export default Services 