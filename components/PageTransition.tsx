'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowLeft, X, Menu } from 'lucide-react'

interface PageTransitionProps {
  children: React.ReactNode
  isVisible: boolean
  onClose: () => void
  direction?: 'left' | 'right'
}

const PageTransition = ({ children, isVisible, onClose, direction = 'right' }: PageTransitionProps) => {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 300)
  }

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isVisible])

  const slideVariants = {
    hidden: {
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.5
      }
    },
    exit: {
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.3
      }
    }
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-dark-900 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Navigation */}
            <div className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-xl border-b border-dark-700">
              <div className="flex items-center justify-between p-4 lg:p-6">
                <button
                  onClick={handleClose}
                  className="flex items-center space-x-3 text-white hover:text-primary-400 transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 bg-dark-700 hover:bg-primary-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <ArrowLeft className="w-5 h-5" />
                  </div>
                  <span className="hidden sm:block font-medium">Volver</span>
                </button>

                <div className="hidden sm:flex items-center space-x-1">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="h-full overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageTransition