'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { name: 'Inicio', href: 'hero' },
    { name: 'Servicios', href: 'services' },
    { name: 'Marcas', href: 'clients' },
    { name: 'Portafolio', href: 'portfolio' },
    { name: 'Casos', href: 'case-studies' },
    { name: 'Proceso', href: 'process' },
    { name: 'Precios', href: 'pricing' },
    { name: 'FAQ', href: 'faq' },
    { name: 'Sobre Nosotros', href: 'about' },
    { name: 'Testimonios', href: 'testimonials' },
    { name: 'Contacto', href: 'contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden ${
        isScrolled
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-700'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm lg:text-lg">A</span>
            </div>
            <span className="text-xl lg:text-2xl font-bold gradient-text">
              Angelware Labs
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-primary-400 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-dark-800/50"
              >
                {item.name}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="button-primary ml-6"
            >
              Contáctanos
            </motion.button>
          </nav>

          {/* Mobile CTA + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => window.dispatchEvent(new Event('openConsultation'))}
              className="hidden sm:inline-flex px-3 py-2 rounded-lg bg-primary-500 text-white text-sm hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              Consulta
            </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-dark-800/50 backdrop-blur-sm border border-dark-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-controls="primary-navigation"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </motion.button>
          </div>
        </div>

        {/* Mobile Menu - overlay + panel deslizante */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.aside
                key="panel"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-dark-900 border-l border-dark-700 shadow-2xl"
                id="primary-navigation"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-dark-700 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <span className="font-semibold">Angelware Labs</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-dark-800 border border-dark-600"
                    aria-label="Cerrar menú"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="py-2">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.name}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection(item.href)}
                      className="w-full text-left px-5 py-3 text-gray-300 hover:text-white hover:bg-dark-800 transition-colors"
                    >
                      {item.name}
                    </motion.button>
                  ))}
                  <div className="px-5 pt-2">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        window.dispatchEvent(new Event('openConsultation'))
                      }}
                      className="w-full button-primary"
                    >
                      Consulta gratuita
                    </motion.button>
                  </div>
                </nav>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header 