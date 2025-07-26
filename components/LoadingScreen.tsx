'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code, Zap, Cpu, Database } from 'lucide-react'

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentIcon, setCurrentIcon] = useState(0)

  const icons = [
    { icon: Code, label: 'Desarrollo', color: 'text-primary-400' },
    { icon: Zap, label: 'Optimización', color: 'text-accent-400' },
    { icon: Cpu, label: 'Procesamiento', color: 'text-blue-400' },
    { icon: Database, label: 'Conexión', color: 'text-purple-400' },
  ]

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 200)

    // Change icons during loading
    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % 4) // Fixed to 4 icons
    }, 800)

    // Complete loading after 3-4 seconds
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false)
      clearInterval(progressInterval)
      clearInterval(iconInterval)
    }, 3500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(iconInterval)
      clearTimeout(loadingTimeout)
    }
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 bg-dark-900 flex items-center justify-center"
    >
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-accent-500/5 to-purple-500/5"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 1 }}
                  className="absolute w-2 h-2 bg-primary-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main Loading Content */}
          <div className="relative z-10 text-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="mb-8"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold gradient-text mb-4"
            >
              Angelware Labs
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-gray-400 text-lg mb-8"
            >
              Transformando ideas en experiencias digitales
            </motion.p>

            {/* Loading Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"
                />
                <span className="text-primary-400 font-medium">
                  {icons[currentIcon].label}
                </span>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={currentIcon}
                  transition={{ duration: 0.3 }}
                  className={icons[currentIcon].color}
                >
                  <icons[currentIcon].icon className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="w-64 md:w-80 mx-auto mb-4"
            >
              <div className="bg-dark-800 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full relative"
                >
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-white/20 rounded-full"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Progress Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="text-gray-500 text-sm"
            >
              {Math.round(progress)}% completado
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.3, y: -20 }}
                  transition={{
                    delay: i * 0.2,
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="absolute w-1 h-1 bg-primary-400 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
  )
}

export default LoadingScreen