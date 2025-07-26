'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { navigation } from '@/lib/site-config'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { smoothScrollTo } from '@/lib/utils'

export default function Header() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, isDarkMode, toggleTheme } = useStore()
  const [isScrolled, setIsScrolled] = useState(false)

  // Detectar scroll para cambiar el estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú móvil al hacer click en un enlace
  const handleNavClick = (href: string) => {
    closeMobileMenu()
    smoothScrollTo(href.replace('#', ''))
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-top",
        isScrolled 
          ? "bg-background-primary/95 backdrop-blur-md border-b border-border-subtle" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <button
              onClick={() => smoothScrollTo('home')}
              className="text-2xl font-heading font-bold text-gradient cursor-pointer"
            >
              TuNombre
            </button>
          </motion.div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => smoothScrollTo(item.href.replace('#', ''))}
                className="text-text-secondary hover:text-accent-neon-blue transition-colors duration-200 font-medium"
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Acciones */}
          <div className="flex items-center space-x-4">
            {/* Botón de tema */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-background-secondary hover:bg-background-secondary/80 transition-colors duration-200"
              aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-text-secondary" />
              ) : (
                <Moon className="h-5 w-5 text-text-secondary" />
              )}
            </motion.button>

            {/* Botón de menú móvil */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full bg-background-secondary hover:bg-background-secondary/80 transition-colors duration-200"
              aria-label="Abrir menú de navegación"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-text-secondary" />
              ) : (
                <Menu className="h-6 w-6 text-text-secondary" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-background-secondary border-t border-border-subtle safe-area-bottom"
          >
            <nav className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navigation.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavClick(item.href)}
                    className="text-left text-lg font-medium text-text-secondary hover:text-accent-neon-blue transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-background-primary/50"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}