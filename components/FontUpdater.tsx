'use client'

import { useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

const FontUpdater = () => {
  const { typography } = useTheme()

  useEffect(() => {
    // Función para verificar si una fuente está cargada
    const isFontLoaded = (fontFamily: string) => {
      return document.fonts.check(`16px "${fontFamily}"`)
    }

    // Función para cargar fuente si no está disponible
    const loadFont = async (fontFamily: string) => {
      if (!isFontLoaded(fontFamily)) {
        try {
          await document.fonts.load(`16px "${fontFamily}"`)
        } catch (error) {
          console.warn(`No se pudo cargar la fuente: ${fontFamily}`)
        }
      }
    }

    const updateFonts = async () => {
      // Cargar fuentes antes de aplicarlas
      await Promise.all([
        loadFont(typography.titleFont),
        loadFont(typography.subtitleFont),
        loadFont(typography.bodyFont)
      ])
      // Aplicar fuentes directamente a elementos específicos
      const titleElements = document.querySelectorAll('h1, h2, .gradient-text')
      const subtitleElements = document.querySelectorAll('h3, h4, h5, h6')
      const bodyElements = document.querySelectorAll('p, span, div, a, button, input, textarea, label')

      // Excluir elementos del dashboard
      const isNotDashboard = (el: Element) => !el.closest('.dashboard-fixed')

      Array.from(titleElements).filter(isNotDashboard).forEach(el => {
        const element = el as HTMLElement
        element.style.setProperty('font-family', `"${typography.titleFont}", sans-serif`, 'important')
      })

      Array.from(subtitleElements).filter(isNotDashboard).forEach(el => {
        const element = el as HTMLElement
        element.style.setProperty('font-family', `"${typography.subtitleFont}", sans-serif`, 'important')
      })

      Array.from(bodyElements).filter(isNotDashboard).forEach(el => {
        const element = el as HTMLElement
        // Solo aplicar a elementos que no tienen fuentes específicas ya definidas
        if (!element.style.fontFamily || element.style.fontFamily.includes('Inter')) {
          element.style.setProperty('font-family', `"${typography.bodyFont}", sans-serif`, 'important')
        }
      })
    }

    // Aplicar fuentes inmediatamente
    updateFonts()

    // Escuchar cambios de fuente
    const handleFontChange = () => {
      setTimeout(updateFonts, 100)
    }

    window.addEventListener('fontChanged', handleFontChange)

    // Observer para elementos que se añaden dinámicamente
    const observer = new MutationObserver(() => {
      setTimeout(updateFonts, 100)
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      window.removeEventListener('fontChanged', handleFontChange)
      observer.disconnect()
    }
  }, [typography.titleFont, typography.subtitleFont, typography.bodyFont])

  return null
}

export default FontUpdater
