import { Project, Skill, Experience, Education, Testimonial } from '@/types'

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Moderno',
    description: 'Plataforma de comercio electrónico completa construida con Next.js 15, TypeScript y Tailwind CSS. Incluye carrito de compras, sistema de pagos, panel de administración y optimización SEO.',
    image: '/projects/ecommerce.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Supabase'],
    category: 'fullstack',
    demoUrl: 'https://ecommerce-demo.vercel.app',
    githubUrl: 'https://github.com/tu-usuario/ecommerce',
    featured: true,
    createdAt: '2024-12-01'
  },
  {
    id: '2',
    title: 'App de Gestión de Tareas',
    description: 'Aplicación móvil-first para gestión de tareas con drag & drop, notificaciones push, sincronización en tiempo real y modo offline. Optimizada para iOS Safari y Android Chrome.',
    image: '/projects/task-manager.jpg',
    technologies: ['React', 'Framer Motion', 'PWA', 'IndexedDB', 'Service Workers'],
    category: 'mobile',
    demoUrl: 'https://task-manager.vercel.app',
    githubUrl: 'https://github.com/tu-usuario/task-manager',
    featured: true,
    createdAt: '2024-11-15'
  },
  {
    id: '3',
    title: 'Dashboard Analytics',
    description: 'Dashboard interactivo para análisis de datos con gráficos en tiempo real, filtros dinámicos y exportación de reportes. Diseño responsivo optimizado para tablets y móviles.',
    image: '/projects/dashboard.jpg',
    technologies: ['React', 'D3.js', 'Zustand', 'Chart.js', 'Tailwind CSS'],
    category: 'frontend',
    demoUrl: 'https://dashboard-demo.vercel.app',
    githubUrl: 'https://github.com/tu-usuario/dashboard',
    featured: false,
    createdAt: '2024-10-20'
  },
  {
    id: '4',
    title: 'API REST con Node.js',
    description: 'API RESTful completa con autenticación JWT, validación de datos, documentación automática con Swagger y tests automatizados. Optimizada para alto rendimiento.',
    image: '/projects/api.jpg',
    technologies: ['Node.js', 'Express', 'JWT', 'MongoDB', 'Jest'],
    category: 'backend',
    demoUrl: 'https://api-docs.vercel.app',
    githubUrl: 'https://github.com/tu-usuario/api-rest',
    featured: false,
    createdAt: '2024-09-10'
  },
  {
    id: '5',
    title: 'Sitio Web Corporativo',
    description: 'Sitio web corporativo moderno con animaciones fluidas, SEO optimizado, accesibilidad WCAG 2.1 y rendimiento perfecto en Core Web Vitals. Diseño mobile-first.',
    image: '/projects/corporate.jpg',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'SEO', 'Accessibility'],
    category: 'frontend',
    demoUrl: 'https://corporate-site.vercel.app',
    githubUrl: 'https://github.com/tu-usuario/corporate-site',
    featured: false,
    createdAt: '2024-08-05'
  },
  {
    id: '6',
    title: 'App de Chat en Tiempo Real',
    description: 'Aplicación de chat con WebSockets, mensajes en tiempo real, notificaciones push y cifrado de extremo a extremo. Interfaz optimizada para móviles con gestos táctiles.',
    image: '/projects/chat.jpg',
    technologies: ['React', 'Socket.io', 'WebRTC', 'PWA', 'CryptoJS'],
    category: 'fullstack',
    demoUrl: 'https://chat-app.vercel.app',
    githubUrl: 'https://github.com/tu-usuario/chat-app',
    featured: true,
    createdAt: '2024-07-15'
  }
]

export const skills: Skill[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    icon: 'react',
    category: 'frontend',
    proficiency: 95,
    color: '#61DAFB'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: 'nextjs',
    category: 'frontend',
    proficiency: 90,
    color: '#000000'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: 'typescript',
    category: 'frontend',
    proficiency: 88,
    color: '#3178C6'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    icon: 'tailwind',
    category: 'frontend',
    proficiency: 92,
    color: '#06B6D4'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'javascript',
    category: 'frontend',
    proficiency: 95,
    color: '#F7DF1E'
  },
  {
    id: 'html',
    name: 'HTML5',
    icon: 'html',
    category: 'frontend',
    proficiency: 98,
    color: '#E34F26'
  },
  {
    id: 'css',
    name: 'CSS3',
    icon: 'css',
    category: 'frontend',
    proficiency: 90,
    color: '#1572B6'
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    icon: 'framer',
    category: 'frontend',
    proficiency: 85,
    color: '#0055FF'
  },
  
  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: 'nodejs',
    category: 'backend',
    proficiency: 80,
    color: '#339933'
  },
  {
    id: 'express',
    name: 'Express.js',
    icon: 'express',
    category: 'backend',
    proficiency: 75,
    color: '#000000'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: 'mongodb',
    category: 'backend',
    proficiency: 70,
    color: '#47A248'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: 'postgresql',
    category: 'backend',
    proficiency: 65,
    color: '#336791'
  },
  
  // Herramientas
  {
    id: 'git',
    name: 'Git',
    icon: 'git',
    category: 'tools',
    proficiency: 90,
    color: '#F05032'
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: 'docker',
    category: 'tools',
    proficiency: 70,
    color: '#2496ED'
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: 'figma',
    category: 'tools',
    proficiency: 75,
    color: '#F24E1E'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    icon: 'vercel',
    category: 'tools',
    proficiency: 85,
    color: '#000000'
  },
  
  // Soft Skills
  {
    id: 'communication',
    name: 'Comunicación',
    icon: 'communication',
    category: 'soft-skills',
    proficiency: 90,
    color: '#00DDEB'
  },
  {
    id: 'teamwork',
    name: 'Trabajo en Equipo',
    icon: 'teamwork',
    category: 'soft-skills',
    proficiency: 88,
    color: '#FF007A'
  },
  {
    id: 'problem-solving',
    name: 'Resolución de Problemas',
    icon: 'problem-solving',
    category: 'soft-skills',
    proficiency: 92,
    color: '#00FF7F'
  },
  {
    id: 'adaptability',
    name: 'Adaptabilidad',
    icon: 'adaptability',
    category: 'soft-skills',
    proficiency: 85,
    color: '#00DDEB'
  }
]

export const experience: Experience[] = [
  {
    id: '1',
    title: 'Desarrollador Frontend Senior',
    company: 'TechCorp',
    location: 'Madrid, España',
    startDate: '2023-01-01',
    current: true,
    description: [
      'Lideré el desarrollo de aplicaciones web modernas usando React, Next.js y TypeScript',
      'Optimicé el rendimiento de aplicaciones existentes, mejorando Core Web Vitals en un 40%',
      'Implementé mejores prácticas de accesibilidad WCAG 2.1 en todos los proyectos',
      'Mentoré a desarrolladores junior y conduje code reviews regulares'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
  },
  {
    id: '2',
    title: 'Desarrollador Frontend',
    company: 'StartupXYZ',
    location: 'Barcelona, España',
    startDate: '2021-06-01',
    endDate: '2022-12-31',
    current: false,
    description: [
      'Desarrollé interfaces de usuario responsivas y accesibles para aplicaciones móviles',
      'Colaboré con diseñadores para implementar diseños pixel-perfect',
      'Integré APIs RESTful y optimicé el rendimiento de aplicaciones',
      'Participé en sprints ágiles y entregas continuas'
    ],
    technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Git']
  },
  {
    id: '3',
    title: 'Desarrollador Web Junior',
    company: 'DigitalAgency',
    location: 'Valencia, España',
    startDate: '2020-03-01',
    endDate: '2021-05-31',
    current: false,
    description: [
      'Creé sitios web responsivos para clientes de diversos sectores',
      'Implementé funcionalidades interactivas con JavaScript vanilla',
      'Optimicé sitios web para SEO y velocidad de carga',
      'Mantuve y actualicé sitios web existentes'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'WordPress', 'SEO']
  }
]

export const education: Education[] = [
  {
    id: '1',
    degree: 'Ingeniería Informática',
    institution: 'Universidad Politécnica de Madrid',
    location: 'Madrid, España',
    startDate: '2016-09-01',
    endDate: '2020-06-30',
    description: 'Especialización en desarrollo de software y tecnologías web. Proyecto final: Aplicación web de gestión de proyectos con React y Node.js.',
    gpa: '8.5/10'
  },
  {
    id: '2',
    degree: 'Bootcamp Desarrollo Web Full Stack',
    institution: 'Ironhack',
    location: 'Madrid, España',
    startDate: '2020-07-01',
    endDate: '2020-09-30',
    description: 'Programa intensivo de 9 semanas enfocado en tecnologías web modernas: JavaScript, React, Node.js y bases de datos.',
    gpa: '9.2/10'
  }
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María García',
    role: 'CEO',
    company: 'TechCorp',
    content: 'Excelente desarrollador frontend. Sus habilidades técnicas y atención al detalle han sido fundamentales para el éxito de nuestros proyectos. Siempre entrega código limpio y bien documentado.',
    avatar: '/testimonials/maria.jpg',
    rating: 5
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    role: 'Product Manager',
    company: 'StartupXYZ',
    content: 'Trabajar con él ha sido una experiencia increíble. Su capacidad para entender las necesidades del usuario y traducirlas en código funcional es excepcional. Altamente recomendado.',
    avatar: '/testimonials/carlos.jpg',
    rating: 5
  },
  {
    id: '3',
    name: 'Ana López',
    role: 'Diseñadora UX/UI',
    company: 'DigitalAgency',
    content: 'Su comprensión del diseño y capacidad para implementar interfaces complejas es impresionante. Siempre va más allá de lo solicitado para crear experiencias excepcionales.',
    avatar: '/testimonials/ana.jpg',
    rating: 5
  }
]