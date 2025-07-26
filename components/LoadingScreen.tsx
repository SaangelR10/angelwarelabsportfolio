'use client'

import { useState, useEffect } from 'react'

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-dark-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-2xl mb-8">
          <span className="text-white font-bold text-2xl">A</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
          Angelware Labs
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Transformando ideas en experiencias digitales
        </p>
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  )
}

export default LoadingScreen