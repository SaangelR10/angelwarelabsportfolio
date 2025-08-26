'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ColorTheme {
  titles: string
  subtitles: string
  buttons: string
  navbar: string
  backgrounds: string[]
  accent: string
  primaryBackground: string
}

interface SectionSettings {
  backgroundColor: string
  textColor: string
  accentColor: string
  borderColor: string
  animation: 'none' | 'fade' | 'slide' | 'bounce' | 'pulse'
  backgroundImage?: string
  backgroundVideo?: string
  opacity: number
}

interface TypographySettings {
  titleFont: string
  subtitleFont: string
  bodyFont: string
  titleSize: number
  subtitleSize: number
  bodySize: number
  lineHeight: number
  letterSpacing: number
}

interface LayoutSettings {
  padding: 'compact' | 'normal' | 'spacious' | 'extra'
  borderRadius: number
  shadows: boolean
  glassmorphism: boolean
  maxWidth: string
  buttonStyle: 'solid' | 'outline' | 'ghost' | 'gradient' | 'neon' | 'glass' | '3d' | 'minimal'
}

interface AnimationSettings {
  backgroundAnimation: 'none' | 'gradient-shift' | 'floating-particles' | 'wave' | 'pulse-grid' | 'aurora' | 'matrix' | 'stars' | 'geometric' | 'liquid'
  pageTransition: 'none' | 'fade' | 'slide' | 'scale' | 'rotate' | 'flip'
  hoverEffects: boolean
  parallax: boolean
}

interface ThemeContextType {
  colors: ColorTheme
  updateColors: (newColors: Partial<ColorTheme>) => void
  typography: TypographySettings
  updateTypography: (settings: Partial<TypographySettings>) => void
  layout: LayoutSettings
  updateLayout: (settings: Partial<LayoutSettings>) => void
  animations: AnimationSettings
  updateAnimations: (settings: Partial<AnimationSettings>) => void
  sectionSettings: Record<string, SectionSettings>
  updateSectionSettings: (sectionId: string, settings: Partial<SectionSettings>) => void
  navbarAnimation: boolean
  setNavbarAnimation: (value: boolean) => void
  backgroundVideo: string
  setBackgroundVideo: (url: string) => void
  applyTheme: () => void
  resetTheme: () => void
}

const defaultTheme: ColorTheme = {
  titles: '#3B82F6',
  subtitles: '#8B5CF6',
  buttons: '#06B6D4',
  navbar: '#1E293B',
  backgrounds: ['#0F172A', '#1E293B', '#334155'],
  accent: '#F59E0B',
  primaryBackground: '#0F172A'
}

const defaultTypography: TypographySettings = {
  titleFont: 'Inter',
  subtitleFont: 'Inter',
  bodyFont: 'Inter',
  titleSize: 48,
  subtitleSize: 24,
  bodySize: 16,
  lineHeight: 1.6,
  letterSpacing: 0
}

const defaultLayout: LayoutSettings = {
  padding: 'normal',
  borderRadius: 12,
  shadows: true,
  glassmorphism: true,
  maxWidth: '1200px',
  buttonStyle: 'gradient'
}

const defaultAnimations: AnimationSettings = {
  backgroundAnimation: 'none',
  pageTransition: 'fade',
  hoverEffects: true,
  parallax: false
}

const defaultSectionSettings: SectionSettings = {
  backgroundColor: 'rgba(15, 23, 42, 0.8)',
  textColor: '#ffffff',
  accentColor: '#3B82F6',
  borderColor: 'rgba(255, 255, 255, 0.1)',
  animation: 'fade',
  opacity: 1
}

const sections = ['hero', 'services', 'portfolio', 'about', 'testimonials', 'contact', 'footer']

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Función para cargar configuraciones desde localStorage
  const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const stored = localStorage.getItem(`angelware-theme-${key}`)
      return stored ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  }

  // Función para guardar en localStorage
  const saveToStorage = (key: string, value: any) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(`angelware-theme-${key}`, JSON.stringify(value))
    } catch (error) {
      console.warn('No se pudo guardar la configuración:', error)
    }
  }

  const [colors, setColors] = useState<ColorTheme>(() => loadFromStorage('colors', defaultTheme))
  const [typography, setTypography] = useState<TypographySettings>(() => loadFromStorage('typography', defaultTypography))
  const [layout, setLayout] = useState<LayoutSettings>(() => loadFromStorage('layout', defaultLayout))
  const [animations, setAnimations] = useState<AnimationSettings>(() => loadFromStorage('animations', defaultAnimations))
  const [sectionSettings, setSectionSettings] = useState<Record<string, SectionSettings>>(() => 
    loadFromStorage('sections', sections.reduce((acc, section) => ({
      ...acc,
      [section]: { ...defaultSectionSettings }
    }), {}))
  )
  const [navbarAnimation, setNavbarAnimation] = useState(() => loadFromStorage('navbarAnimation', false))
  const [backgroundVideo, setBackgroundVideo] = useState(() => loadFromStorage('backgroundVideo', ''))

  const updateColors = (newColors: Partial<ColorTheme>) => {
    setColors(prev => {
      const updated = { ...prev, ...newColors }
      saveToStorage('colors', updated)
      return updated
    })
  }

  const updateTypography = (settings: Partial<TypographySettings>) => {
    setTypography(prev => {
      const updated = { ...prev, ...settings }
      saveToStorage('typography', updated)
      return updated
    })
  }

  const updateLayout = (settings: Partial<LayoutSettings>) => {
    setLayout(prev => {
      const updated = { ...prev, ...settings }
      saveToStorage('layout', updated)
      return updated
    })
  }

  const updateAnimations = (settings: Partial<AnimationSettings>) => {
    setAnimations(prev => {
      const updated = { ...prev, ...settings }
      saveToStorage('animations', updated)
      return updated
    })
  }

  const updateSectionSettings = (sectionId: string, settings: Partial<SectionSettings>) => {
    setSectionSettings(prev => {
      const updated = {
        ...prev,
        [sectionId]: { ...prev[sectionId], ...settings }
      }
      saveToStorage('sections', updated)
      return updated
    })
  }

  // Funciones mejoradas para navbar y background video
  const setNavbarAnimationWithStorage = (value: boolean) => {
    setNavbarAnimation(value)
    saveToStorage('navbarAnimation', value)
  }

  const setBackgroundVideoWithStorage = (url: string) => {
    setBackgroundVideo(url)
    saveToStorage('backgroundVideo', url)
  }

  const resetTheme = () => {
    // Resetear estados
    setColors(defaultTheme)
    setTypography(defaultTypography)
    setLayout(defaultLayout)
    setAnimations(defaultAnimations)
    setSectionSettings(sections.reduce((acc, section) => ({
      ...acc,
      [section]: { ...defaultSectionSettings }
    }), {}))
    setNavbarAnimation(false)
    setBackgroundVideo('')

    // Limpiar localStorage
    try {
      const keys = ['colors', 'typography', 'layout', 'animations', 'sections', 'navbarAnimation', 'backgroundVideo']
      keys.forEach(key => localStorage.removeItem(`angelware-theme-${key}`))
    } catch (error) {
      console.warn('No se pudo limpiar localStorage:', error)
    }
  }

  const applyTheme = () => {
    const root = document.documentElement
    
    // Aplicar colores CSS custom properties
    root.style.setProperty('--color-titles', colors.titles)
    root.style.setProperty('--color-subtitles', colors.subtitles)
    root.style.setProperty('--color-buttons', colors.buttons)
    root.style.setProperty('--color-navbar', colors.navbar)
    root.style.setProperty('--color-accent', colors.accent)
    root.style.setProperty('--color-bg-primary', colors.backgrounds[0])
    root.style.setProperty('--color-bg-secondary', colors.backgrounds[1])
    root.style.setProperty('--color-bg-tertiary', colors.backgrounds[2])
    root.style.setProperty('--color-primary-background', colors.primaryBackground)

    // Aplicar tipografía
    root.style.setProperty('--font-title', `"${typography.titleFont}", sans-serif`)
    root.style.setProperty('--font-subtitle', `"${typography.subtitleFont}", sans-serif`)
    root.style.setProperty('--font-body', `"${typography.bodyFont}", sans-serif`)
    root.style.setProperty('--size-title', `${typography.titleSize}px`)
    root.style.setProperty('--size-subtitle', `${typography.subtitleSize}px`)
    root.style.setProperty('--size-body', `${typography.bodySize}px`)
    root.style.setProperty('--line-height', typography.lineHeight.toString())
    root.style.setProperty('--letter-spacing', `${typography.letterSpacing}px`)

    // Debug: Log de fuentes aplicadas
    console.log('Fuentes aplicadas:', {
      title: typography.titleFont,
      subtitle: typography.subtitleFont,
      body: typography.bodyFont
    })

    // Aplicar layout
    const paddingValues = {
      compact: '40px',
      normal: '80px',
      spacious: '120px',
      extra: '160px'
    }
    root.style.setProperty('--section-padding', paddingValues[layout.padding])
    root.style.setProperty('--border-radius', `${layout.borderRadius}px`)
    root.style.setProperty('--max-width', layout.maxWidth)
    root.style.setProperty('--button-style', layout.buttonStyle)

    // Aplicar configuraciones de animación
    root.style.setProperty('--background-animation', animations.backgroundAnimation)
    root.style.setProperty('--page-transition', animations.pageTransition)

    // Aplicar estilos dinámicos a elementos específicos (excluyendo el dashboard)
    const titleElements = document.querySelectorAll('.dynamic-title, h1:not(.dashboard-fixed h1), h2:not(.dashboard-fixed h2), .gradient-text:not(.dashboard-fixed .gradient-text)')
    const subtitleElements = document.querySelectorAll('.dynamic-subtitle, h3:not(.dashboard-fixed h3), h4:not(.dashboard-fixed h4), h5:not(.dashboard-fixed h5), h6:not(.dashboard-fixed h6)')
    const buttonElements = document.querySelectorAll('.dynamic-button, .button-primary:not(.dashboard-fixed .button-primary), .button-secondary:not(.dashboard-fixed .button-secondary), button:not(.dashboard-fixed button)')
    const navbarElements = document.querySelectorAll('.dynamic-navbar, nav:not(.dashboard-fixed nav), header:not(.dashboard-fixed header)')
    
    // Aplicar fuentes a elementos con clases dinámicas
    const titleFontElements = document.querySelectorAll('.dynamic-title-font, .dynamic-title')
    const subtitleFontElements = document.querySelectorAll('.dynamic-subtitle-font, .dynamic-subtitle')
    const bodyFontElements = document.querySelectorAll('.dynamic-body-font, .dynamic-body')

    titleElements.forEach(el => {
      const element = el as HTMLElement
      element.style.color = colors.titles
    })

    subtitleElements.forEach(el => {
      const element = el as HTMLElement
      element.style.color = colors.subtitles
    })

    // Aplicar fuentes específicamente con mayor fuerza
    titleFontElements.forEach(el => {
      const element = el as HTMLElement
      element.style.setProperty('font-family', `"${typography.titleFont}", sans-serif`, 'important')
      element.style.setProperty('font-size', `${typography.titleSize}px`, 'important')
    })

    subtitleFontElements.forEach(el => {
      const element = el as HTMLElement
      element.style.setProperty('font-family', `"${typography.subtitleFont}", sans-serif`, 'important')
      element.style.setProperty('font-size', `${typography.subtitleSize}px`, 'important')
    })

    bodyFontElements.forEach(el => {
      const element = el as HTMLElement
      element.style.setProperty('font-family', `"${typography.bodyFont}", sans-serif`, 'important')
      element.style.setProperty('font-size', `${typography.bodySize}px`, 'important')
    })

    // Aplicar fuentes a TODOS los elementos de texto principales (más agresivo)
    const allTitles = document.querySelectorAll('h1:not(.dashboard-fixed h1), h2:not(.dashboard-fixed h2)')
    const allSubtitles = document.querySelectorAll('h3:not(.dashboard-fixed h3), h4:not(.dashboard-fixed h4), h5:not(.dashboard-fixed h5), h6:not(.dashboard-fixed h6)')
    const allBodyText = document.querySelectorAll('p:not(.dashboard-fixed p), span:not(.dashboard-fixed span), .text-lg:not(.dashboard-fixed .text-lg), .text-xl:not(.dashboard-fixed .text-xl)')

    allTitles.forEach(el => {
      const element = el as HTMLElement
      element.style.setProperty('font-family', `"${typography.titleFont}", sans-serif`, 'important')
    })

    allSubtitles.forEach(el => {
      const element = el as HTMLElement
      element.style.setProperty('font-family', `"${typography.subtitleFont}", sans-serif`, 'important')
    })

    allBodyText.forEach(el => {
      const element = el as HTMLElement
      element.style.setProperty('font-family', `"${typography.bodyFont}", sans-serif`, 'important')
    })

    buttonElements.forEach(el => {
      const element = el as HTMLElement
      element.style.borderRadius = `${layout.borderRadius}px`
      
      // Aplicar estilo de botón
      element.classList.remove('btn-solid', 'btn-outline', 'btn-ghost', 'btn-gradient', 'btn-neon', 'btn-glass', 'btn-3d', 'btn-minimal')
      element.classList.add(`btn-${layout.buttonStyle}`)
      
      if (layout.buttonStyle === 'solid') {
        element.style.backgroundColor = colors.buttons
        element.style.color = 'white'
        element.style.border = 'none'
      } else if (layout.buttonStyle === 'outline') {
        element.style.backgroundColor = 'transparent'
        element.style.color = colors.buttons
        element.style.border = `2px solid ${colors.buttons}`
      }
    })

    navbarElements.forEach(el => {
      const element = el as HTMLElement
      element.style.backgroundColor = colors.navbar
    })

    // Aplicar configuraciones por sección
    sections.forEach(sectionId => {
      const sectionElement = document.getElementById(sectionId) || document.querySelector(`[data-section="${sectionId}"]`)
      if (sectionElement && sectionSettings[sectionId]) {
        const settings = sectionSettings[sectionId]
        const element = sectionElement as HTMLElement
        
        element.style.backgroundColor = settings.backgroundColor
        element.style.color = settings.textColor
        element.style.opacity = settings.opacity.toString()
        element.style.borderColor = settings.borderColor
        
        // Aplicar animaciones
        element.classList.remove('animate-fade', 'animate-slide', 'animate-bounce', 'animate-pulse')
        if (settings.animation !== 'none') {
          element.classList.add(`animate-${settings.animation}`)
        }

        // Aplicar imagen o video de fondo
        if (settings.backgroundImage) {
          element.style.backgroundImage = `url(${settings.backgroundImage})`
          element.style.backgroundSize = 'cover'
          element.style.backgroundPosition = 'center'
        }
      }
    })

    // Aplicar video de fondo global si existe
    if (backgroundVideo) {
      const videoContainer = document.getElementById('background-video-container')
      if (videoContainer) {
        videoContainer.innerHTML = `
          <video 
            autoplay 
            muted 
            loop 
            class="absolute inset-0 w-full h-full object-cover opacity-20"
          >
            <source src="${backgroundVideo}" type="video/mp4">
          </video>
        `
      }
    }

    // Aplicar animaciones del navbar
    const navbar = document.querySelector('nav') || document.querySelector('header')
    if (navbar && navbarAnimation) {
      navbar.classList.add('animate-navbar-float')
    } else if (navbar) {
      navbar.classList.remove('animate-navbar-float')
    }

    // Aplicar efectos glassmorphism si está habilitado
    if (layout.glassmorphism) {
      document.body.classList.add('glassmorphism-enabled')
    } else {
      document.body.classList.remove('glassmorphism-enabled')
    }

    // Aplicar sombras si está habilitado
    if (layout.shadows) {
      document.body.classList.add('shadows-enabled')
    } else {
      document.body.classList.remove('shadows-enabled')
    }

    // Aplicar animaciones de fondo
    document.body.classList.remove('bg-gradient-shift', 'bg-floating-particles', 'bg-wave', 'bg-pulse-grid', 'bg-aurora', 'bg-matrix', 'bg-stars', 'bg-geometric', 'bg-liquid')
    if (animations.backgroundAnimation !== 'none') {
      document.body.classList.add(`bg-${animations.backgroundAnimation}`)
    }

    // Aplicar efectos hover
    if (animations.hoverEffects) {
      document.body.classList.add('hover-effects-enabled')
    } else {
      document.body.classList.remove('hover-effects-enabled')
    }

    // Aplicar parallax
    if (animations.parallax) {
      document.body.classList.add('parallax-enabled')
    } else {
      document.body.classList.remove('parallax-enabled')
    }

    // Aplicar color de fondo principal al body
    document.body.style.backgroundColor = colors.primaryBackground

    // Forzar recarga de fuentes de múltiples maneras
    document.body.classList.add('font-update-trigger')
    
    // Forzar repaint del navegador
    document.body.style.display = 'none'
    document.body.offsetHeight // Trigger reflow
    document.body.style.display = ''
    
    // Remover clase temporal
    setTimeout(() => {
      document.body.classList.remove('font-update-trigger')
    }, 50)

    // Disparar evento personalizado para notificar cambio de fuentes
    window.dispatchEvent(new CustomEvent('fontChanged', {
      detail: {
        titleFont: typography.titleFont,
        subtitleFont: typography.subtitleFont,
        bodyFont: typography.bodyFont
      }
    }))
  }

  useEffect(() => {
    applyTheme()
  }, [colors, typography, layout, animations, sectionSettings, navbarAnimation, backgroundVideo])

  return (
    <ThemeContext.Provider value={{
      colors,
      updateColors,
      typography,
      updateTypography,
      layout,
      updateLayout,
      animations,
      updateAnimations,
      sectionSettings,
      updateSectionSettings,
      navbarAnimation,
      setNavbarAnimation: setNavbarAnimationWithStorage,
      backgroundVideo,
      setBackgroundVideo: setBackgroundVideoWithStorage,
      applyTheme,
      resetTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
