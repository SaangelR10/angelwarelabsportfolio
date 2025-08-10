export type ProjectItem = {
  id: number
  title: string
  category: 'ecommerce' | 'fullstack' | 'mobile' | 'web'
  image: string
  description: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
}

export const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: 'E-commerce Moderno',
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    description: 'Plataforma de comercio electrónico completa con React, Node.js y Stripe.',
    technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    liveUrl: 'https://angelwarelabs.com/',
    githubUrl: 'https://github.com/',
    featured: true,
  },
  {
    id: 2,
    title: 'App de Gestión Empresarial',
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    description: 'Sistema integral de gestión empresarial con dashboard en tiempo real.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    liveUrl: 'https://angelwarelabs.com/',
    githubUrl: 'https://github.com/',
    featured: true,
  },
  {
    id: 3,
    title: 'App de Delivery',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop',
    description: 'Aplicación móvil de delivery con geolocalización y pagos integrados.',
    technologies: ['React Native', 'Firebase', 'Google Maps', 'Stripe'],
    liveUrl: 'https://angelwarelabs.com/',
    githubUrl: 'https://github.com/',
    featured: false,
  },
  {
    id: 4,
    title: 'Portal Corporativo',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
    description: 'Portal web corporativo con CMS personalizado y diseño responsivo.',
    technologies: ['React', 'Strapi', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://angelwarelabs.com/',
    githubUrl: 'https://github.com/',
    featured: false,
  },
  {
    id: 5,
    title: 'Plataforma de Streaming',
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=600&h=400&fit=crop',
    description: 'Plataforma de streaming con transcodificación de video y CDN.',
    technologies: ['Next.js', 'AWS', 'FFmpeg', 'Redis'],
    liveUrl: 'https://angelwarelabs.com/',
    githubUrl: 'https://github.com/',
    featured: false,
  },
  {
    id: 6,
    title: 'App de Fitness',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    description: 'Aplicación de fitness con tracking de ejercicios y progreso personalizado.',
    technologies: ['Flutter', 'Firebase', 'HealthKit', 'Google Fit'],
    liveUrl: 'https://angelwarelabs.com/',
    githubUrl: 'https://github.com/',
    featured: false,
  },
]


