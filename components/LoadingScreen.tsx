'use client'

import { useState, useEffect } from 'react'
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
    <div className="fixed inset-0 z-50 bg-dark-900 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-accent-500/5 to-purple-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <div className="mb-8 animate-bounce">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4 animate-fade-in">
          Angelware Labs
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg mb-8 animate-fade-in">
          Transformando ideas en experiencias digitales
        </p>

        {/* Loading Icon */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-primary-400 font-medium">
              {icons[currentIcon].label}
            </span>
            <div className={icons[currentIcon].color}>
              <icons[currentIcon].icon className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-80 mx-auto mb-4">
          <div className="bg-dark-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full relative transition-all duration-300"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Progress Text */}
        <div className="text-gray-500 text-sm">
          {Math.round(progress)}% completado
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary-400 rounded-full animate-bounce"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen