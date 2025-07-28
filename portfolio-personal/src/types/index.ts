// Tipos para proyectos
export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: 'frontend' | 'fullstack' | 'mobile' | 'backend' | 'design'
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  createdAt: string
}

// Tipos para habilidades
export interface Skill {
  id: string
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'tools' | 'soft-skills'
  proficiency: number // 0-100
  color: string
}

// Tipos para experiencia
export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  description: string[]
  technologies: string[]
}

// Tipos para educación
export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description: string
  gpa?: string
}

// Tipos para testimonios
export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

// Tipos para contacto
export interface ContactForm {
  name: string
  email: string
  message: string
}

// Tipos para redes sociales
export interface SocialLink {
  id: string
  name: string
  url: string
  icon: string
  color: string
}

// Tipos para navegación
export interface NavItem {
  id: string
  label: string
  href: string
  icon?: string
}

// Tipos para animaciones
export interface AnimationConfig {
  initial: any
  animate: any
  exit: any
  transition: any
}

// Tipos para configuración del sitio
export interface SiteConfig {
  name: string
  title: string
  description: string
  url: string
  ogImage: string
  links: {
    github: string
    linkedin: string
    twitter: string
    email: string
  }
}

// Tipos para estadísticas
export interface Stats {
  projects: number
  experience: number
  skills: number
  clients: number
}