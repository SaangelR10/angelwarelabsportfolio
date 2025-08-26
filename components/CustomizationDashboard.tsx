'use client'

import { useState, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Settings, 
  Palette, 
  Type, 
  Square, 
  Navigation, 
  Play, 
  Save, 
  Copy, 
  Download, 
  Upload,
  X,
  ChevronDown,
  ChevronRight,
  Brush,
  Video,
  Wand2,
  Code,
  Eye,
  RefreshCw,
  Heart
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface ColorTheme {
  id: string
  name: string
  colors: {
    titles: string
    subtitles: string
    buttons: string
    navbar: string
    backgrounds: string[]
    accent: string
  }
}

interface CustomizationDashboardProps {
  isOpen: boolean
  onClose: () => void
}

const predefinedThemes: ColorTheme[] = [
  {
    id: 'default',
    name: 'Angelware Original',
    colors: {
      titles: '#3B82F6',
      subtitles: '#8B5CF6',
      buttons: '#06B6D4',
      navbar: '#1E293B',
      backgrounds: ['#0F172A', '#1E293B', '#334155'],
      accent: '#F59E0B',
      primaryBackground: '#0F172A'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    colors: {
      titles: '#F97316',
      subtitles: '#EF4444',
      buttons: '#EC4899',
      navbar: '#7C2D12',
      backgrounds: ['#451A03', '#7C2D12', '#C2410C'],
      accent: '#FBBF24',
      primaryBackground: '#451A03'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Depths',
    colors: {
      titles: '#0EA5E9',
      subtitles: '#06B6D4',
      buttons: '#0891B2',
      navbar: '#164E63',
      backgrounds: ['#0C4A6E', '#164E63', '#0369A1'],
      accent: '#22D3EE',
      primaryBackground: '#0C4A6E'
    }
  },
  {
    id: 'forest',
    name: 'Forest Mystique',
    colors: {
      titles: '#10B981',
      subtitles: '#059669',
      buttons: '#047857',
      navbar: '#064E3B',
      backgrounds: ['#022C22', '#064E3B', '#065F46'],
      accent: '#34D399',
      primaryBackground: '#022C22'
    }
  }
]

export default function CustomizationDashboard({ isOpen, onClose }: CustomizationDashboardProps) {
  const { 
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
    setNavbarAnimation, 
    backgroundVideo, 
    setBackgroundVideo,
    resetTheme
  } = useTheme()
  
  const [activeSection, setActiveSection] = useState<string>('colors')
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(predefinedThemes[0])
  const [previewMode, setPreviewMode] = useState(false)
  const [previewColors, setPreviewColors] = useState<ColorTheme | null>(null)
  const [savedPalettes, setSavedPalettes] = useState<ColorTheme[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem('angelware-saved-palettes')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const [selectedSection, setSelectedSection] = useState<string>('hero')
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const importInputRef = useRef<HTMLInputElement>(null)

  const availableFonts = [
    'Inter', 'Roboto', 'Montserrat', 'Poppins', 'Open Sans', 
    'Lato', 'Source Sans Pro', 'Nunito', 'Raleway', 'JetBrains Mono',
    'Fira Code', 'Playfair Display', 'Oswald', 'Merriweather'
  ]

  const dashboardSections = [
    { id: 'colors', name: 'Colores', icon: Palette },
    { id: 'typography', name: 'Tipografía', icon: Type },
    { id: 'layout', name: 'Diseño', icon: Square },
    { id: 'sections', name: 'Secciones', icon: Navigation },
    { id: 'animations', name: 'Animaciones', icon: Wand2 },
    { id: 'background', name: 'Fondo', icon: Video },
    { id: 'palettes', name: 'Paletas', icon: Save }
  ]

  const websiteSections = [
    { id: 'hero', name: 'Hero/Principal' },
    { id: 'services', name: 'Servicios' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'about', name: 'Acerca de' },
    { id: 'testimonials', name: 'Testimonios' },
    { id: 'contact', name: 'Contacto' },
    { id: 'footer', name: 'Footer' }
  ]

  // Función de debounce para optimizar rendimiento
  const debounce = useCallback((func: Function, wait: number) => {
    let timeout: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(null, args), wait)
    }
  }, [])

  // Función optimizada para cambios de color con debounce
  const debouncedColorChange = useMemo(
    () => debounce((key: string, value: string) => {
      updateColors({ [key]: value })
    }, 150),
    [debounce, updateColors]
  )

  const handleColorChange = useCallback((key: string, value: string) => {
    debouncedColorChange(key, value)
  }, [debouncedColorChange])

  const handleVideoUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setBackgroundVideo(url)
    }
  }, [])

  const savePalette = useCallback(() => {
    const newPalette: ColorTheme = {
      id: Date.now().toString(),
      name: `Paleta ${savedPalettes.length + 1}`,
      colors: { ...colors }
    }
    const updatedPalettes = [...savedPalettes, newPalette]
    setSavedPalettes(updatedPalettes)
    
    // Guardar en localStorage
    try {
      localStorage.setItem('angelware-saved-palettes', JSON.stringify(updatedPalettes))
    } catch (error) {
      console.warn('No se pudo guardar la paleta:', error)
    }
  }, [colors, savedPalettes])

  const exportPalette = useCallback(() => {
    const paletteData = {
      name: selectedTheme.name,
      colors: colors,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedTheme.name.toLowerCase().replace(/\s+/g, '-')}-palette.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [selectedTheme.name, colors])

  const copyColorCode = useCallback((color: string) => {
    navigator.clipboard.writeText(color)
  }, [])

  const importPalette = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const paletteData = JSON.parse(content)
        
        if (paletteData.colors) {
          const importedPalette: ColorTheme = {
            id: Date.now().toString(),
            name: paletteData.name || 'Paleta Importada',
            colors: paletteData.colors
          }
          
          const updatedPalettes = [...savedPalettes, importedPalette]
          setSavedPalettes(updatedPalettes)
          localStorage.setItem('angelware-saved-palettes', JSON.stringify(updatedPalettes))
          
          // Aplicar la paleta importada
          updateColors(paletteData.colors)
          setSelectedTheme(importedPalette)
        }
      } catch (error) {
        console.error('Error al importar la paleta:', error)
        alert('Error al importar la paleta. Verifica que el archivo sea válido.')
      }
    }
    reader.readAsText(file)
    
    // Limpiar el input
    if (event.target) {
      event.target.value = ''
    }
  }, [savedPalettes, updateColors])

  const deletePalette = useCallback((paletteId: string) => {
    const updatedPalettes = savedPalettes.filter(p => p.id !== paletteId)
    setSavedPalettes(updatedPalettes)
    localStorage.setItem('angelware-saved-palettes', JSON.stringify(updatedPalettes))
  }, [savedPalettes])

  // Funciones para modo de vista previa
  const startPreview = useCallback((theme: ColorTheme) => {
    setPreviewColors(colors) // Guardar colores actuales
    setPreviewMode(true)
    updateColors(theme.colors)
  }, [colors, updateColors])

  const applyPreview = useCallback(() => {
    setPreviewMode(false)
    setPreviewColors(null)
  }, [])

  const cancelPreview = useCallback(() => {
    if (previewColors) {
      updateColors(previewColors)
    }
    setPreviewMode(false)
    setPreviewColors(null)
  }, [previewColors, updateColors])

  // Función para generar paleta aleatoria
  const generateRandomPalette = useCallback(() => {
    const randomColor = () => {
      const hue = Math.floor(Math.random() * 360)
      const saturation = 60 + Math.floor(Math.random() * 40) // 60-100%
      const lightness = 45 + Math.floor(Math.random() * 20) // 45-65%
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    }

    const randomPalette: ColorTheme = {
      titles: randomColor(),
      subtitles: randomColor(),
      buttons: randomColor(),
      navbar: randomColor(),
      backgrounds: [randomColor(), randomColor(), randomColor()],
      accent: randomColor(),
      primaryBackground: randomColor()
    }

    startPreview({ id: 'random', name: 'Paleta Aleatoria', colors: randomPalette })
  }, [startPreview])

  const ColorPicker = ({ label, value, onChange }: { label: string, value: string, onChange: (value: string) => void }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div className="flex items-center space-x-3">
        <div 
          className="w-12 h-12 rounded-lg border-2 border-gray-600 cursor-pointer relative overflow-hidden"
          style={{ backgroundColor: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            placeholder="#000000"
          />
        </div>
        <button
          onClick={() => copyColorCode(value)}
          className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Dashboard Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="dashboard-fixed fixed right-0 top-0 h-full w-full max-w-md sm:max-w-lg md:max-w-md z-50 border-l border-white/20 flex flex-col"
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
            }}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Personalización</h2>
                    <p className="text-sm text-gray-400">
                      {previewMode ? 'Modo Vista Previa' : 'Dashboard Premium'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {previewMode ? (
                    <>
                      <button
                        onClick={applyPreview}
                        className="p-2 hover:bg-green-500/20 rounded-lg transition-colors group"
                        title="Aplicar cambios"
                      >
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-all duration-300" />
                      </button>
                      <button
                        onClick={cancelPreview}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                        title="Cancelar vista previa"
                      >
                        <X className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-all duration-300" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={generateRandomPalette}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                        title="Paleta aleatoria"
                      >
                        <Wand2 className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-all duration-300" />
                      </button>
                      <button
                        onClick={() => {
                          updateColors({
                            titles: '#3B82F6',
                            subtitles: '#8B5CF6', 
                            buttons: '#06B6D4',
                            navbar: '#1E293B',
                            backgrounds: ['#0F172A', '#1E293B', '#334155'],
                            accent: '#F59E0B',
                            primaryBackground: '#0F172A'
                          })
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                        title="Colores originales"
                      >
                        <Palette className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-all duration-300" />
                      </button>
                      <button
                        onClick={resetTheme}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                        title="Resetear todo"
                      >
                        <RefreshCw className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:rotate-180 transition-all duration-300" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
              
              {/* Barra de vista previa */}
              {previewMode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-blue-400 font-medium">Vista Previa Activa</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={applyPreview}
                        className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 hover:bg-green-500/30 transition-colors"
                      >
                        Aplicar
                      </button>
                      <button
                        onClick={cancelPreview}
                        className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 hover:bg-red-500/30 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Navigation */}
            <div className="p-4 border-b border-white/10 flex-shrink-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {dashboardSections.map((section) => {
                  const Icon = section.icon
                  const isActive = activeSection === section.id
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center space-x-1 sm:space-x-2 p-2 sm:p-3 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 text-white' 
                          : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-transparent'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-medium hidden sm:block">{section.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 dashboard-scroll">
              {activeSection === 'colors' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Predefined Themes */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Temas Predefinidos</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {predefinedThemes.map((theme) => (
                        <div key={theme.id} className="relative group">
                          <button
                            onClick={() => {
                              setSelectedTheme(theme)
                              updateColors(theme.colors)
                            }}
                            onMouseEnter={() => !previewMode && startPreview(theme)}
                            onMouseLeave={() => !previewMode && cancelPreview()}
                            className={`w-full p-3 rounded-lg border transition-all ${
                              selectedTheme.id === theme.id
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/30'
                            }`}
                          >
                            <div className="flex space-x-1 mb-2">
                              {[
                                theme.colors.primaryBackground,
                                theme.colors.titles,
                                theme.colors.buttons,
                                theme.colors.accent
                              ].map((color, idx) => (
                                <div
                                  key={idx}
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: Array.isArray(color) ? color[0] : color }}
                                />
                              ))}
                            </div>
                            <p className="text-xs text-white font-medium">{theme.name}</p>
                          </button>
                          
                          {/* Botón de vista previa */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              startPreview(theme)
                            }}
                            className="absolute top-2 right-2 p-1 bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Vista previa"
                          >
                            <Eye className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Color Controls */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-white">Personalizar Colores</h3>
                    
                    <ColorPicker
                      label="Títulos Principales"
                      value={colors.titles}
                      onChange={(value) => handleColorChange('titles', value)}
                    />
                    
                    <ColorPicker
                      label="Subtítulos"
                      value={colors.subtitles}
                      onChange={(value) => handleColorChange('subtitles', value)}
                    />
                    
                    <ColorPicker
                      label="Botones"
                      value={colors.buttons}
                      onChange={(value) => handleColorChange('buttons', value)}
                    />
                    
                    <ColorPicker
                      label="Navbar"
                      value={colors.navbar}
                      onChange={(value) => handleColorChange('navbar', value)}
                    />
                    
                    <ColorPicker
                      label="Color de Acento"
                      value={colors.accent}
                      onChange={(value) => handleColorChange('accent', value)}
                    />
                    
                    <div className="border-t border-white/10 pt-4">
                      <h4 className="text-sm font-semibold text-white mb-3">Fondo del Sitio</h4>
                      <ColorPicker
                        label="Color de Fondo Principal"
                        value={colors.primaryBackground}
                        onChange={(value) => handleColorChange('primaryBackground', value)}
                      />
                      <p className="text-xs text-gray-400 mt-2">
                        Este color se aplicará como fondo principal de todo el sitio web
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'typography' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Tamaños de Fuente */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Tamaños de Fuente</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Títulos Principales</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="range"
                            min="24"
                            max="72"
                            value={typography.titleSize}
                            onChange={(e) => updateTypography({ titleSize: parseInt(e.target.value) })}
                            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-sm text-gray-400 w-12">{typography.titleSize}px</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Subtítulos</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="range"
                            min="16"
                            max="36"
                            value={typography.subtitleSize}
                            onChange={(e) => updateTypography({ subtitleSize: parseInt(e.target.value) })}
                            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-sm text-gray-400 w-12">{typography.subtitleSize}px</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Texto del Cuerpo</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="range"
                            min="12"
                            max="24"
                            value={typography.bodySize}
                            onChange={(e) => updateTypography({ bodySize: parseInt(e.target.value) })}
                            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-sm text-gray-400 w-12">{typography.bodySize}px</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Espaciado de Texto */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Espaciado de Texto</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Altura de Línea</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="range"
                            min="1"
                            max="2.5"
                            step="0.1"
                            value={typography.lineHeight}
                            onChange={(e) => updateTypography({ lineHeight: parseFloat(e.target.value) })}
                            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-sm text-gray-400 w-12">{typography.lineHeight}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Espaciado de Letras</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="range"
                            min="-2"
                            max="4"
                            step="0.5"
                            value={typography.letterSpacing}
                            onChange={(e) => updateTypography({ letterSpacing: parseFloat(e.target.value) })}
                            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-sm text-gray-400 w-12">{typography.letterSpacing}px</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fuentes para Títulos */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Fuente para Títulos</h3>
                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto dashboard-scroll">
                      {availableFonts.map((font) => (
                        <button
                          key={`title-${font}`}
                          onClick={() => updateTypography({ titleFont: font })}
                          className={`p-3 text-left rounded-lg border transition-all ${
                            typography.titleFont === font 
                              ? 'border-blue-500 bg-blue-500/20' 
                              : 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/30'
                          }`}
                          style={{ fontFamily: font }}
                        >
                          <span className="text-white text-lg">Título de Ejemplo</span>
                          <p className="text-xs text-gray-400 mt-1">{font}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Fuentes para Subtítulos */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Fuente para Subtítulos</h3>
                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto dashboard-scroll">
                      {availableFonts.map((font) => (
                        <button
                          key={`subtitle-${font}`}
                          onClick={() => updateTypography({ subtitleFont: font })}
                          className={`p-3 text-left rounded-lg border transition-all ${
                            typography.subtitleFont === font 
                              ? 'border-blue-500 bg-blue-500/20' 
                              : 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/30'
                          }`}
                          style={{ fontFamily: font }}
                        >
                          <span className="text-white">Subtítulo de Ejemplo</span>
                          <p className="text-xs text-gray-400 mt-1">{font}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Fuentes para Cuerpo */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Fuente para Cuerpo</h3>
                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto dashboard-scroll">
                      {availableFonts.map((font) => (
                        <button
                          key={`body-${font}`}
                          onClick={() => updateTypography({ bodyFont: font })}
                          className={`p-3 text-left rounded-lg border transition-all ${
                            typography.bodyFont === font 
                              ? 'border-blue-500 bg-blue-500/20' 
                              : 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/30'
                          }`}
                          style={{ fontFamily: font }}
                        >
                          <span className="text-white text-sm">Este es un ejemplo de texto del cuerpo para ver cómo se ve la fuente.</span>
                          <p className="text-xs text-gray-400 mt-1">{font}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'layout' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Espaciado General */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Espaciado de Secciones</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'compact', name: 'Compacto', value: '40px' },
                        { id: 'normal', name: 'Normal', value: '80px' },
                        { id: 'spacious', name: 'Espacioso', value: '120px' },
                        { id: 'extra', name: 'Extra', value: '160px' }
                      ].map((spacing) => (
                        <button
                          key={spacing.id}
                          onClick={() => updateLayout({ padding: spacing.id as any })}
                          className={`p-3 rounded-lg border transition-all text-center ${
                            layout.padding === spacing.id
                              ? 'border-blue-500 bg-blue-500/20 text-white'
                              : 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/30 text-gray-300'
                          }`}
                        >
                          <div className="text-sm font-medium">{spacing.name}</div>
                          <div className="text-xs text-gray-400">{spacing.value}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bordes Redondeados */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Bordes Redondeados</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="range"
                          min="0"
                          max="32"
                          value={layout.borderRadius}
                          onChange={(e) => updateLayout({ borderRadius: parseInt(e.target.value) })}
                          className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-sm text-gray-400 w-12">{layout.borderRadius}px</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[0, 4, 8, 12, 16, 20, 24, 32].map((radius) => (
                          <button
                            key={radius}
                            onClick={() => updateLayout({ borderRadius: radius })}
                            className={`p-2 rounded border transition-all text-center ${
                              layout.borderRadius === radius
                                ? 'border-blue-500 bg-blue-500/20 text-white'
                                : 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/30 text-gray-300'
                            }`}
                            style={{ borderRadius: `${radius}px` }}
                          >
                            <div className="text-xs">{radius}px</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Ancho Máximo del Contenido */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Ancho Máximo del Contenido</h3>
                    <div className="space-y-3">
                      <select 
                        value={layout.maxWidth}
                        onChange={(e) => updateLayout({ maxWidth: e.target.value })}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="1024px">1024px - Compacto</option>
                        <option value="1200px">1200px - Normal</option>
                        <option value="1400px">1400px - Amplio</option>
                        <option value="1600px">1600px - Extra Amplio</option>
                        <option value="100%">100% - Sin límite</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Efectos Visuales */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Efectos Visuales</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-600">
                        <div>
                          <span className="text-sm text-white font-medium">Efectos Glassmorphism</span>
                          <p className="text-xs text-gray-400">Fondos translúcidos con blur</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={layout.glassmorphism}
                          onChange={(e) => updateLayout({ glassmorphism: e.target.checked })}
                          className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-600">
                        <div>
                          <span className="text-sm text-white font-medium">Sombras Suaves</span>
                          <p className="text-xs text-gray-400">Sombras para elementos</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={layout.shadows}
                          onChange={(e) => updateLayout({ shadows: e.target.checked })}
                          className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                        />
                      </label>
                    </div>
                  </div>
                  
                  {/* Estilos de Botones */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Estilos de Botones</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'solid', name: 'Sólido', desc: 'Relleno completo' },
                        { id: 'outline', name: 'Borde', desc: 'Solo contorno' },
                        { id: 'ghost', name: 'Fantasma', desc: 'Transparente' },
                        { id: 'gradient', name: 'Gradiente', desc: 'Colores degradados' },
                        { id: 'neon', name: 'Neón', desc: 'Efecto luminoso' },
                        { id: 'glass', name: 'Cristal', desc: 'Glassmorphism' },
                        { id: '3d', name: '3D', desc: 'Efecto tridimensional' },
                        { id: 'minimal', name: 'Minimal', desc: 'Línea inferior' }
                      ].map((style) => (
                        <button
                          key={style.id}
                          onClick={() => updateLayout({ buttonStyle: style.id as any })}
                          className={`p-3 rounded-lg border transition-all text-center ${
                            layout.buttonStyle === style.id
                              ? 'border-blue-500 bg-blue-500/20 text-white'
                              : 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/30 text-gray-300'
                          }`}
                        >
                          <div className="text-xs font-medium">{style.name}</div>
                          <div className="text-xs text-gray-400 mt-1">{style.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Presets de Diseño */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Presets de Diseño</h3>
                    <div className="space-y-2">
                      {[
                        { name: 'Minimalista', desc: 'Espaciado amplio, bordes suaves', settings: { padding: 'spacious', borderRadius: 16, shadows: false, glassmorphism: false, buttonStyle: 'minimal' } },
                        { name: 'Moderno', desc: 'Glassmorphism con sombras', settings: { padding: 'normal', borderRadius: 12, shadows: true, glassmorphism: true, buttonStyle: 'glass' } },
                        { name: 'Compacto', desc: 'Espacios reducidos, sin efectos', settings: { padding: 'compact', borderRadius: 8, shadows: false, glassmorphism: false, buttonStyle: 'solid' } },
                        { name: 'Premium', desc: 'Máximos efectos visuales', settings: { padding: 'spacious', borderRadius: 20, shadows: true, glassmorphism: true, buttonStyle: 'gradient' } }
                      ].map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => updateLayout(preset.settings as any)}
                          className="w-full p-3 text-left bg-gray-800/30 hover:bg-gray-700/30 rounded-lg border border-gray-600 transition-colors"
                        >
                          <div className="text-sm text-white font-medium">{preset.name}</div>
                          <div className="text-xs text-gray-400">{preset.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'sections' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Selector de Sección */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Seleccionar Sección</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {websiteSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setSelectedSection(section.id)}
                          className={`p-3 text-left rounded-lg border transition-all ${
                            selectedSection === section.id
                              ? 'border-blue-500 bg-blue-500/20 text-white'
                              : 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/30 text-gray-300'
                          }`}
                        >
                          <span className="text-sm font-medium">{section.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Personalización de la Sección Seleccionada */}
                  {selectedSection && sectionSettings[selectedSection] && (
                    <>
                      <div className="border-t border-white/10 pt-4">
                        <h3 className="text-sm font-semibold text-white mb-3">
                          Personalizando: {websiteSections.find(s => s.id === selectedSection)?.name}
                        </h3>
                      </div>

                      {/* Color de Fondo */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Color de Fondo</h4>
                        <ColorPicker
                          label="Fondo de la sección"
                          value={sectionSettings[selectedSection].backgroundColor}
                          onChange={(value) => updateSectionSettings(selectedSection, { backgroundColor: value })}
                        />
                      </div>

                      {/* Color de Texto */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Color de Texto</h4>
                        <ColorPicker
                          label="Texto principal"
                          value={sectionSettings[selectedSection].textColor}
                          onChange={(value) => updateSectionSettings(selectedSection, { textColor: value })}
                        />
                      </div>

                      {/* Color de Acento */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Color de Acento</h4>
                        <ColorPicker
                          label="Elementos destacados"
                          value={sectionSettings[selectedSection].accentColor}
                          onChange={(value) => updateSectionSettings(selectedSection, { accentColor: value })}
                        />
                      </div>

                      {/* Opacidad */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Opacidad</h4>
                        <div className="flex items-center space-x-3">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={sectionSettings[selectedSection].opacity}
                            onChange={(e) => updateSectionSettings(selectedSection, { opacity: parseFloat(e.target.value) })}
                            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-sm text-gray-400 w-12">{Math.round(sectionSettings[selectedSection].opacity * 100)}%</span>
                        </div>
                      </div>

                      {/* Animación */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Animación de Entrada</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'none', name: 'Sin animación' },
                            { id: 'fade', name: 'Fade In' },
                            { id: 'slide', name: 'Slide In' },
                            { id: 'bounce', name: 'Bounce In' },
                            { id: 'pulse', name: 'Pulse' }
                          ].map((animation) => (
                            <button
                              key={animation.id}
                              onClick={() => updateSectionSettings(selectedSection, { animation: animation.id as any })}
                              className={`p-2 rounded border text-center transition-all ${
                                sectionSettings[selectedSection].animation === animation.id
                                  ? 'border-blue-500 bg-blue-500/20 text-white'
                                  : 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/30 text-gray-300'
                              }`}
                            >
                              <div className="text-xs">{animation.name}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Imagen de Fondo */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Imagen de Fondo</h4>
                        <div className="space-y-3">
                          <input
                            type="url"
                            placeholder="URL de la imagen"
                            value={sectionSettings[selectedSection].backgroundImage || ''}
                            onChange={(e) => updateSectionSettings(selectedSection, { backgroundImage: e.target.value })}
                            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                          />
                          {sectionSettings[selectedSection].backgroundImage && (
                            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                              <p className="text-sm text-green-400">Imagen aplicada correctamente</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Reset de Sección */}
                      <div className="pt-4 border-t border-white/10">
                        <button
                          onClick={() => updateSectionSettings(selectedSection, {
                            backgroundColor: 'rgba(15, 23, 42, 0.8)',
                            textColor: '#ffffff',
                            accentColor: '#3B82F6',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            animation: 'fade',
                            opacity: 1,
                            backgroundImage: ''
                          })}
                          className="w-full p-3 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors text-center"
                        >
                          <span className="text-sm text-red-400 font-medium">Resetear esta sección</span>
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {activeSection === 'animations' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Animaciones de Fondo */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Animaciones de Fondo</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'none', name: 'Sin animación', desc: 'Fondo estático' },
                        { id: 'gradient-shift', name: 'Gradiente', desc: 'Colores cambiantes' },
                        { id: 'floating-particles', name: 'Partículas', desc: 'Puntos flotantes' },
                        { id: 'wave', name: 'Ondas', desc: 'Efecto de onda' },
                        { id: 'pulse-grid', name: 'Grid Pulse', desc: 'Cuadrícula pulsante' },
                        { id: 'aurora', name: 'Aurora', desc: 'Luces boreales' },
                        { id: 'matrix', name: 'Matrix', desc: 'Líneas digitales' },
                        { id: 'stars', name: 'Estrellas', desc: 'Cielo estrellado' },
                        { id: 'geometric', name: 'Geométrico', desc: 'Formas rotatorias' },
                        { id: 'liquid', name: 'Líquido', desc: 'Formas fluidas' }
                      ].map((animation) => (
                        <button
                          key={animation.id}
                          onClick={() => updateAnimations({ backgroundAnimation: animation.id as any })}
                          className={`p-3 rounded-lg border transition-all text-center ${
                            animations.backgroundAnimation === animation.id
                              ? 'border-blue-500 bg-blue-500/20 text-white'
                              : 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/30 text-gray-300'
                          }`}
                        >
                          <div className="text-xs font-medium">{animation.name}</div>
                          <div className="text-xs text-gray-400 mt-1">{animation.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Transiciones de Página */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Transiciones de Página</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'none', name: 'Sin transición' },
                        { id: 'fade', name: 'Fade' },
                        { id: 'slide', name: 'Deslizar' },
                        { id: 'scale', name: 'Escalar' },
                        { id: 'rotate', name: 'Rotar' },
                        { id: 'flip', name: 'Voltear' }
                      ].map((transition) => (
                        <button
                          key={transition.id}
                          onClick={() => updateAnimations({ pageTransition: transition.id as any })}
                          className={`p-2 rounded border text-center transition-all ${
                            animations.pageTransition === transition.id
                              ? 'border-blue-500 bg-blue-500/20 text-white'
                              : 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/30 text-gray-300'
                          }`}
                        >
                          <div className="text-xs">{transition.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Animaciones del Navbar */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Animaciones del Navbar</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-600">
                        <div>
                          <span className="text-sm text-white font-medium">Animación Flotante</span>
                          <p className="text-xs text-gray-400">Navbar con movimiento suave</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={navbarAnimation}
                          onChange={(e) => setNavbarAnimation(e.target.checked)}
                          className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Efectos de Interacción */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Efectos de Interacción</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-600">
                        <div>
                          <span className="text-sm text-white font-medium">Efectos Hover</span>
                          <p className="text-xs text-gray-400">Animaciones al pasar el mouse</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={animations.hoverEffects}
                          onChange={(e) => updateAnimations({ hoverEffects: e.target.checked })}
                          className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-600">
                        <div>
                          <span className="text-sm text-white font-medium">Efecto Parallax</span>
                          <p className="text-xs text-gray-400">Movimiento de profundidad al scroll</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={animations.parallax}
                          onChange={(e) => updateAnimations({ parallax: e.target.checked })}
                          className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Animaciones por Sección */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Animaciones Globales</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'fade', 'slide', 'bounce', 'pulse', 'zoom', 'flip', 'rotate', 'shake'
                      ].map((animation) => (
                        <button
                          key={animation}
                          className="p-2 bg-gray-800/30 hover:bg-gray-700/30 rounded border border-gray-600 text-sm text-gray-300 transition-colors text-center"
                        >
                          {animation.charAt(0).toUpperCase() + animation.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'background' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Video de Fondo</h3>
                    <div className="space-y-4">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 transition-colors text-center"
                      >
                        <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-400">Arrastra un video o haz clic para seleccionar</p>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                      {backgroundVideo && (
                        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <p className="text-sm text-green-400">Video cargado correctamente</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'palettes' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Gestión de Paletas</h3>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <button
                        onClick={savePalette}
                        className="flex items-center justify-center space-x-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span className="text-sm">Guardar</span>
                      </button>
                      <button
                        onClick={exportPalette}
                        className="flex items-center justify-center space-x-2 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Exportar</span>
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <button
                        onClick={() => importInputRef.current?.click()}
                        className="w-full flex items-center justify-center space-x-2 p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        <span className="text-sm">Importar Paleta</span>
                      </button>
                      <input
                        ref={importInputRef}
                        type="file"
                        accept=".json"
                        onChange={importPalette}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {savedPalettes.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Paletas Guardadas</h4>
                      <div className="space-y-2">
                        {savedPalettes.map((palette) => (
                          <div
                            key={palette.id}
                            className="p-3 bg-gray-800/30 rounded-lg border border-gray-600"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex space-x-1">
                                  {[
                                    palette.colors.primaryBackground,
                                    palette.colors.titles,
                                    palette.colors.buttons,
                                    palette.colors.accent
                                  ].map((color, idx) => (
                                    <div
                                      key={idx}
                                      className="w-3 h-3 rounded-full"
                                      style={{ backgroundColor: Array.isArray(color) ? color[0] : color }}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-white">{palette.name}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => {
                                    setSelectedTheme(palette)
                                    updateColors(palette.colors)
                                  }}
                                  className="p-1 hover:bg-gray-600/50 rounded transition-colors"
                                  title="Aplicar paleta"
                                >
                                  <RefreshCw className="w-4 h-4 text-gray-400 hover:text-green-400" />
                                </button>
                                <button
                                  onClick={() => deletePalette(palette.id)}
                                  className="p-1 hover:bg-red-500/20 rounded transition-colors"
                                  title="Eliminar paleta"
                                >
                                  <X className="w-4 h-4 text-gray-400 hover:text-red-400" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 flex-shrink-0">
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-xs">Made with love by Angelware Labs</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
