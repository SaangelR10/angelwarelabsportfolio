'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, CheckCircle, Star, Clock, Users, Zap, Shield, Code } from 'lucide-react'
import { useEffect } from 'react'

interface MobileModalProps {
  isOpen: boolean
  onClose: () => void
  service: any
}

const MobileModal = ({ isOpen, onClose, service }: MobileModalProps) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
      document.body.style.width = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
      document.body.style.width = 'unset'
    }
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={handleBackdropClick}
          onTouchStart={handleTouchStart}
          style={{ 
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}
        >
          <motion.div
            initial={{ 
              opacity: 0, 
              y: 100,
              scale: 0.9
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              y: 100,
              scale: 0.9
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="relative w-full max-w-md mx-4 bg-dark-800 border border-dark-700 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden"
            style={{ 
              maxHeight: '90vh',
              WebkitOverflowScrolling: 'touch'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-dark-800/95 backdrop-blur-xl border-b border-dark-700 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${service?.gradient} rounded-xl flex items-center justify-center`}>
                    <service?.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-white">
                      {service?.title}
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Servicio profesional
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-dark-700 hover:bg-dark-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Star className="w-5 h-5 text-primary-400 mr-2" />
                  Descripción
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {service?.detailedDescription || service?.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-400 mr-2" />
                  Características
                </h3>
                <div className="space-y-2">
                  {service?.features?.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-dark-700/50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-primary-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              {service?.benefits && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Zap className="w-5 h-5 text-primary-400 mr-2" />
                    Beneficios
                  </h3>
                  <div className="space-y-2">
                    {service.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-2 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-lg border border-primary-500/20">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process */}
              {service?.process && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Clock className="w-5 h-5 text-primary-400 mr-2" />
                    Proceso
                  </h3>
                  <div className="space-y-3">
                    {service.process.map((step: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-dark-700/30 rounded-lg">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-primary-500' :
                          index === 1 ? 'bg-accent-500' :
                          index === 2 ? 'bg-green-500' :
                          index === 3 ? 'bg-yellow-500' :
                          'bg-purple-500'
                        } text-white`}>
                          {index + 1}
                        </div>
                        <span className="text-gray-300 text-sm flex-1">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service?.timeline && (
                  <div className="p-3 bg-dark-700/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-primary-400" />
                      <h4 className="font-semibold text-white text-sm">Tiempo</h4>
                    </div>
                    <p className="text-gray-300 text-xs">{service.timeline}</p>
                  </div>
                )}
                
                {service?.team && (
                  <div className="p-3 bg-dark-700/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-4 h-4 text-primary-400" />
                      <h4 className="font-semibold text-white text-sm">Equipo</h4>
                    </div>
                    <p className="text-gray-300 text-xs">{service.team}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-dark-800/95 backdrop-blur-xl border-t border-dark-700 p-4 sm:p-6">
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 bg-dark-700 hover:bg-dark-600 text-white py-3 px-4 rounded-lg transition-colors font-medium"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  Cerrar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-3 px-4 rounded-lg transition-all font-medium flex items-center justify-center space-x-2"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <span>Contactar</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileModal