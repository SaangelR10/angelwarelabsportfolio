import { create } from 'zustand'

interface PortfolioStore {
  // Estado del menú móvil
  isMobileMenuOpen: boolean
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  
  // Estado del tema
  isDarkMode: boolean
  toggleTheme: () => void
  
  // Estado de las animaciones
  animationsEnabled: boolean
  toggleAnimations: () => void
  
  // Estado de los filtros de proyectos
  projectFilter: string
  setProjectFilter: (filter: string) => void
  
  // Estado de carga
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  
  // Estado del formulario de contacto
  contactForm: {
    name: string
    email: string
    message: string
  }
  updateContactForm: (field: string, value: string) => void
  resetContactForm: () => void
}

export const useStore = create<PortfolioStore>((set) => ({
  // Menú móvil
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  
  // Tema
  isDarkMode: true, // Por defecto modo oscuro
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  // Animaciones
  animationsEnabled: true,
  toggleAnimations: () => set((state) => ({ animationsEnabled: !state.animationsEnabled })),
  
  // Filtros de proyectos
  projectFilter: 'all',
  setProjectFilter: (filter) => set({ projectFilter: filter }),
  
  // Carga
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  // Formulario de contacto
  contactForm: {
    name: '',
    email: '',
    message: ''
  },
  updateContactForm: (field, value) => 
    set((state) => ({
      contactForm: {
        ...state.contactForm,
        [field]: value
      }
    })),
  resetContactForm: () => set({
    contactForm: {
      name: '',
      email: '',
      message: ''
    }
  })
}))