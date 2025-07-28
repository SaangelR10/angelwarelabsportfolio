import { SiteConfig, NavItem, SocialLink } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'Tu Nombre',
  title: 'Desarrollador Frontend | Soluciones Innovadoras',
  description: 'Desarrollador frontend especializado en crear experiencias web modernas y accesibles. Experto en React, Next.js, TypeScript y diseño responsivo optimizado para móviles.',
  url: 'https://tu-portfolio.vercel.app',
  ogImage: '/og-image.jpg',
  links: {
    github: 'https://github.com/tu-usuario',
    linkedin: 'https://linkedin.com/in/tu-usuario',
    twitter: 'https://twitter.com/tu-usuario',
    email: 'tu-email@ejemplo.com'
  }
}

export const navigation: NavItem[] = [
  {
    id: 'home',
    label: 'Inicio',
    href: '#home',
    icon: 'home'
  },
  {
    id: 'about',
    label: 'Sobre Mí',
    href: '#about',
    icon: 'user'
  },
  {
    id: 'projects',
    label: 'Proyectos',
    href: '#projects',
    icon: 'folder'
  },
  {
    id: 'skills',
    label: 'Habilidades',
    href: '#skills',
    icon: 'code'
  },
  {
    id: 'contact',
    label: 'Contacto',
    href: '#contact',
    icon: 'mail'
  }
]

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/tu-usuario',
    icon: 'github',
    color: '#00DDEB'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/tu-usuario',
    icon: 'linkedin',
    color: '#FF007A'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    url: 'https://twitter.com/tu-usuario',
    icon: 'twitter',
    color: '#00FF7F'
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:tu-email@ejemplo.com',
    icon: 'mail',
    color: '#00DDEB'
  }
]

export const heroData = {
  title: 'Desarrollador Frontend',
  subtitle: 'Soluciones Innovadoras',
  description: 'Creo experiencias web modernas y accesibles que impactan. Especializado en React, Next.js y diseño responsivo optimizado para dispositivos móviles.',
  ctaText: 'Explora Proyectos',
  ctaHref: '#projects'
}

export const aboutData = {
  name: 'Tu Nombre',
  title: 'Desarrollador Frontend',
  bio: `Soy un desarrollador frontend apasionado por crear experiencias digitales excepcionales. 
  Con más de 3 años de experiencia en el desarrollo web, me especializo en tecnologías modernas 
  como React, Next.js, TypeScript y Tailwind CSS. Mi enfoque se centra en la optimización para 
  dispositivos móviles, accesibilidad y rendimiento, asegurando que cada proyecto no solo se vea 
  increíble, sino que también funcione perfectamente en todos los dispositivos.`,
  avatar: '/avatar.jpg',
  cvUrl: '/cv.pdf',
  stats: [
    { label: 'Proyectos Completados', value: '25+' },
    { label: 'Años de Experiencia', value: '3+' },
    { label: 'Tecnologías Dominadas', value: '15+' },
    { label: 'Clientes Satisfechos', value: '20+' }
  ]
}

export const contactData = {
  email: 'tu-email@ejemplo.com',
  location: 'Tu Ciudad, País',
  availability: 'Disponible para proyectos freelance',
  responseTime: 'Respuesta en 24 horas'
}

export const seoData = {
  title: 'Tu Nombre - Desarrollador Frontend',
  description: 'Portafolio personal de desarrollador frontend especializado en React, Next.js y diseño responsivo. Experiencia en creación de aplicaciones web modernas y accesibles.',
  keywords: [
    'desarrollador frontend',
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'diseño responsivo',
    'desarrollo web',
    'JavaScript',
    'CSS',
    'HTML'
  ],
  author: 'Tu Nombre',
  robots: 'index, follow',
  ogType: 'website',
  twitterCard: 'summary_large_image'
}