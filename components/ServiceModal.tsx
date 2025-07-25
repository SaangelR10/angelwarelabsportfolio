'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, CheckCircle, Star, Clock, Users, Zap, Shield, Code, Database, Globe, Smartphone } from 'lucide-react'
import { useEffect } from 'react'

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  service: {
    icon: any
    title: string
    description: string
    features: string[]
    gradient: string
    detailedDescription?: string
    benefits?: string[]
    process?: string[]
    technologies?: string[]
    pricing?: {
      basic: string
      professional: string
      enterprise: string
    }
    timeline?: string
    team?: string
  }
}

const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }

  const defaultBenefits = [
    'Mejora la eficiencia operativa',
    'Reduce costos a largo plazo',
    'Escalabilidad garantizada',
    'Soporte técnico especializado'
  ]

  const defaultProcess = [
    'Análisis de requisitos',
    'Diseño de arquitectura',
    'Desarrollo e implementación',
    'Pruebas y optimización',
    'Despliegue y mantenimiento'
  ]

  const defaultTechnologies = [
    'Tecnologías de vanguardia',
    'Frameworks modernos',
    'Herramientas de desarrollo',
    'Plataformas cloud'
  ]

  const benefits = service.benefits || defaultBenefits
  const process = service.process || defaultProcess
  const technologies = service.technologies || defaultTechnologies

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-800/95 backdrop-blur-xl border border-dark-700 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-dark-800/95 backdrop-blur-xl border-b border-dark-700 rounded-t-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {service.title}
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                      Solución profesional y personalizada
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 bg-dark-700 hover:bg-dark-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Star className="w-5 h-5 text-primary-400 mr-2" />
                  Descripción del Servicio
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {service.detailedDescription || service.description}
                </p>
              </div>

              {/* Features Grid */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-400 mr-2" />
                  Características Principales
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-dark-700/50 rounded-lg border border-dark-600"
                    >
                      <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Zap className="w-5 h-5 text-primary-400 mr-2" />
                  Beneficios
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-lg border border-primary-500/20"
                    >
                      <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Clock className="w-5 h-5 text-primary-400 mr-2" />
                  Proceso de Trabajo
                </h3>
                <div className="space-y-4">
                  {process.map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-dark-700/30 rounded-lg border border-dark-600"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-primary-500 text-white' :
                        index === 1 ? 'bg-accent-500 text-white' :
                        index === 2 ? 'bg-green-500 text-white' :
                        index === 3 ? 'bg-yellow-500 text-white' :
                        'bg-purple-500 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-gray-300 flex-1">{step}</span>
                      {index < process.length - 1 && (
                        <ArrowRight className="w-5 h-5 text-gray-500" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Code className="w-5 h-5 text-primary-400 mr-2" />
                  Tecnologías Utilizadas
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 bg-dark-700/50 rounded-lg border border-dark-600 text-center hover:border-primary-500/30 transition-colors duration-300"
                    >
                      <span className="text-gray-300 text-sm font-medium">{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {service.timeline && (
                  <div className="p-4 bg-dark-700/30 rounded-lg border border-dark-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-5 h-5 text-primary-400" />
                      <h4 className="font-semibold text-white">Tiempo de Entrega</h4>
                    </div>
                    <p className="text-gray-300">{service.timeline}</p>
                  </div>
                )}
                
                {service.team && (
                  <div className="p-4 bg-dark-700/30 rounded-lg border border-dark-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-5 h-5 text-primary-400" />
                      <h4 className="font-semibold text-white">Equipo</h4>
                    </div>
                    <p className="text-gray-300">{service.team}</p>
                  </div>
                )}

                <div className="p-4 bg-dark-700/30 rounded-lg border border-dark-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-primary-400" />
                    <h4 className="font-semibold text-white">Garantía</h4>
                  </div>
                  <p className="text-gray-300">100% de satisfacción garantizada</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-dark-800/95 backdrop-blur-xl border-t border-dark-700 rounded-b-2xl p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="text-center sm:text-left">
                  <p className="text-gray-400 text-sm">
                    ¿Listo para comenzar tu proyecto?
                  </p>
                  <p className="text-white font-semibold">
                    Contacta con nosotros hoy mismo
                  </p>
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="button-secondary"
                  >
                    Cerrar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="button-primary"
                  >
                    Solicitar Cotización
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ServiceModal