'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Palette } from 'lucide-react'
import CustomizationDashboard from './CustomizationDashboard'

export default function CustomizationTrigger() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8, type: 'spring' }}
        className="dashboard-fixed fixed right-0 top-1/2 -translate-y-1/2 z-30 sm:block"
      >
        <motion.button
          onClick={() => setIsDashboardOpen(true)}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          {/* Main Button */}
          <div 
            className="relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(139, 92, 246, 0.8) 100%)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px 0 0 12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRight: 'none',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)'
              }}
            />
            
            {/* Content */}
            <div className="relative flex items-center p-4 space-x-3">
              {/* Icon Container */}
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: isHovered ? 180 : 0,
                    scale: isHovered ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center w-8 h-8"
                >
                  <Settings className="w-5 h-5 text-white" />
                </motion.div>
                
                {/* Pulse Animation */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0 rounded-full bg-white/20"
                />
              </div>
              
              {/* Text */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    <span className="text-white font-medium text-sm">
                      Personalizar
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Glow Effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                filter: 'blur(8px)'
              }}
            />
          </div>
          
          {/* Extended Tab */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-2 -bottom-2 -left-1 w-1 origin-center"
            style={{
              background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.6))',
              borderRadius: '4px 0 0 4px'
            }}
          />
        </motion.button>
        
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-3 pointer-events-none"
            >
              <div 
                className="px-3 py-2 rounded-lg text-xs font-medium text-white whitespace-nowrap"
                style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                Dashboard de Personalización
                {/* Arrow */}
                <div 
                  className="absolute left-full top-1/2 -translate-y-1/2 w-2 h-2 rotate-45"
                  style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Secondary Indicators */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="dashboard-fixed fixed right-2 top-1/2 translate-y-8 z-20 space-y-2"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut'
            }}
            className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
          />
        ))}
      </motion.div>

      {/* Mobile Trigger Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8, type: 'spring' }}
        className="dashboard-fixed fixed bottom-6 right-6 z-30 sm:hidden"
      >
        <motion.button
          onClick={() => setIsDashboardOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Settings className="w-6 h-6 text-white" />
            </motion.div>
            
            {/* Pulse rings */}
            <motion.div
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.5, 0.2, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 rounded-full border-2 border-white/30"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1.8],
                opacity: [0.3, 0.1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 rounded-full border-2 border-white/20"
            />
          </div>
        </motion.button>
      </motion.div>

      {/* Dashboard */}
      <CustomizationDashboard 
        isOpen={isDashboardOpen} 
        onClose={() => setIsDashboardOpen(false)} 
      />
    </>
  )
}
