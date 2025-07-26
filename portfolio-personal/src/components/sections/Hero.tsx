'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Github, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { heroData, socialLinks } from '@/lib/site-config'
import { smoothScrollTo } from '@/lib/utils'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-dark opacity-50" />
      
      {/* Partículas de fondo (simuladas con CSS) */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-accent-neon-blue rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent-neon-magenta rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-accent-neon-green rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-accent-neon-blue rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Título principal */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6"
          >
            {heroData.title}
            <br />
            <span className="text-gradient">{heroData.subtitle}</span>
          </motion.h1>

          {/* Descripción */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {heroData.description}
          </motion.p>

          {/* Botones de acción */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              variant="gradient"
              onClick={() => smoothScrollTo('projects')}
              className="w-full sm:w-auto text-lg px-8 py-4"
            >
              {heroData.ctaText}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('/cv.pdf', '_blank')}
              className="w-full sm:w-auto text-lg px-8 py-4"
            >
              <Download className="mr-2 h-5 w-5" />
              Descargar CV
            </Button>
          </motion.div>

          {/* Redes sociales */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center space-x-6 mb-12"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-background-secondary hover:bg-background-secondary/80 transition-all duration-200 group"
                style={{ '--hover-color': social.color } as React.CSSProperties}
              >
                {social.icon === 'github' && (
                  <Github className="h-6 w-6 text-text-secondary group-hover:text-accent-neon-blue transition-colors" />
                )}
                {social.icon === 'linkedin' && (
                  <Linkedin className="h-6 w-6 text-text-secondary group-hover:text-accent-neon-magenta transition-colors" />
                )}
                {social.icon === 'twitter' && (
                  <Twitter className="h-6 w-6 text-text-secondary group-hover:text-accent-neon-green transition-colors" />
                )}
              </motion.a>
            ))}
          </motion.div>

          {/* Indicador de scroll */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={() => smoothScrollTo('about')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-background-secondary/50 hover:bg-background-secondary transition-colors duration-200"
              aria-label="Ir a la siguiente sección"
            >
              <ArrowDown className="h-6 w-6 text-text-secondary animate-bounce" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Líneas decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent via-accent-neon-blue to-transparent opacity-30" />
        <div className="absolute bottom-1/4 right-0 w-32 h-px bg-gradient-to-l from-transparent via-accent-neon-magenta to-transparent opacity-30" />
      </div>
    </section>
  )
}