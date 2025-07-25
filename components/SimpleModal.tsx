'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface SimpleModalProps {
  isOpen: boolean
  onClose: () => void
  service: any
}

const SimpleModal = ({ isOpen, onClose, service }: SimpleModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-md bg-dark-800 border border-dark-700 rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">{service?.title}</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-dark-700 hover:bg-dark-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-gray-300 mb-4">{service?.description}</p>
            
            <div className="space-y-2">
              {service?.features?.map((feature: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 bg-dark-700 hover:bg-dark-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Cerrar
              </button>
              <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-colors">
                Contactar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SimpleModal