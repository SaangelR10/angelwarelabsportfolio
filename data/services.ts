export type ServiceItem = {
  id: string
  icon: any
  title: string
  description: string
  detailedDescription?: string
  features: string[]
  benefits?: string[]
  process?: string[]
  technologies?: string[]
  timeline?: string
  team?: string
  gradient: string
}

// Nota: los iconos se importan en el componente para tree-shaking
export const servicesData = [
  {
    id: 'desarrollo-web',
    icon: 'Globe',
    title: 'Desarrollo Web',
    description: 'Sitios web modernos, responsivos y optimizados para SEO con las últimas tecnologías.',
    detailedDescription:
      'Creamos sitios web profesionales que no solo se ven increíbles, sino que también convierten visitantes en clientes. Nuestro enfoque incluye diseño responsivo, optimización SEO, velocidad de carga excepcional y experiencia de usuario intuitiva.',
    features: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'SEO Optimizado'],
    benefits: [
      'Mayor visibilidad en buscadores',
      'Experiencia de usuario excepcional',
      'Velocidad de carga optimizada',
      'Diseño adaptativo para todos los dispositivos',
    ],
    process: [
      'Análisis de requisitos y objetivos',
      'Diseño de wireframes y prototipos',
      'Desarrollo frontend y backend',
      'Optimización SEO y rendimiento',
      'Pruebas y despliegue',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Vercel', 'AWS'],
    timeline: '4-8 semanas',
    team: '2-3 desarrolladores',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'apps-moviles',
    icon: 'Smartphone',
    title: 'Aplicaciones Móviles',
    description: 'Apps nativas e híbridas para iOS y Android con experiencia de usuario excepcional.',
    detailedDescription:
      'Desarrollamos aplicaciones móviles nativas e híbridas que destacan en las tiendas de aplicaciones. Nuestras apps combinan diseño intuitivo, rendimiento excepcional y funcionalidades avanzadas para maximizar el engagement de los usuarios.',
    features: ['React Native', 'Flutter', 'iOS & Android', 'App Store Ready'],
    benefits: ['Presencia en iOS y Android', 'Experiencia de usuario nativa', 'Rendimiento optimizado', 'Actualizaciones automáticas'],
    process: [
      'Análisis de mercado y usuarios',
      'Diseño de UX/UI móvil',
      'Desarrollo nativo/híbrido',
      'Pruebas en dispositivos reales',
      'Publicación en tiendas',
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'App Store Connect', 'Google Play Console'],
    timeline: '8-12 semanas',
    team: '3-4 desarrolladores',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'full-stack',
    icon: 'Code',
    title: 'Desarrollo Full-Stack',
    description: 'Soluciones completas desde el frontend hasta el backend con arquitectura escalable.',
    detailedDescription:
      'Ofrecemos soluciones full-stack completas que abarcan desde la interfaz de usuario hasta la infraestructura del servidor. Nuestras aplicaciones están construidas con arquitecturas escalables y tecnologías modernas para garantizar el crecimiento futuro.',
    features: ['Node.js & Express', 'Python & Django', 'PostgreSQL', 'AWS & Vercel'],
    benefits: ['Arquitectura escalable', 'Desarrollo ágil y eficiente', 'Integración completa', 'Mantenimiento simplificado'],
    process: [
      'Análisis de arquitectura',
      'Desarrollo de API y backend',
      'Implementación frontend',
      'Integración y pruebas',
      'Despliegue y monitoreo',
    ],
    technologies: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes'],
    timeline: '12-16 semanas',
    team: '4-5 desarrolladores',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'bases-datos',
    icon: 'Database',
    title: 'Bases de Datos',
    description: 'Diseño e implementación de bases de datos robustas y optimizadas para tu negocio.',
    detailedDescription:
      'Diseñamos e implementamos bases de datos robustas que son la base de aplicaciones escalables. Nuestro enfoque incluye optimización de consultas, seguridad de datos, respaldos automáticos y monitoreo continuo del rendimiento.',
    features: ['PostgreSQL', 'MongoDB', 'Redis', 'Optimización'],
    benefits: ['Rendimiento optimizado', 'Seguridad de datos avanzada', 'Escalabilidad horizontal', 'Respaldo y recuperación automática'],
    process: [
      'Análisis de requisitos de datos',
      'Diseño de esquema y relaciones',
      'Implementación y migración',
      'Optimización de consultas',
      'Configuración de respaldos',
    ],
    technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Elasticsearch', 'AWS RDS', 'Docker'],
    timeline: '2-4 semanas',
    team: '1-2 especialistas',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'ciberseguridad',
    icon: 'Shield',
    title: 'Ciberseguridad',
    description: 'Protección integral de datos y aplicaciones con las mejores prácticas de seguridad.',
    detailedDescription:
      'Protegemos tu infraestructura digital con las mejores prácticas de ciberseguridad. Nuestros servicios incluyen auditorías de seguridad, implementación de protocolos SSL/TLS, autenticación multifactor y monitoreo continuo de amenazas.',
    features: ['SSL/TLS', 'Autenticación', 'Encriptación', 'Auditorías'],
    benefits: ['Protección contra amenazas', 'Cumplimiento de regulaciones', 'Confianza del cliente', 'Reducción de riesgos'],
    process: [
      'Evaluación de vulnerabilidades',
      'Implementación de seguridad',
      'Configuración de monitoreo',
      'Pruebas de penetración',
      'Documentación y capacitación',
    ],
    technologies: ["SSL/TLS", 'OAuth 2.0', 'JWT', "Let's Encrypt", 'Cloudflare', 'AWS Security', 'Docker Security'],
    timeline: '3-6 semanas',
    team: '2-3 especialistas',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'consultoria-it',
    icon: 'Zap',
    title: 'Consultoría IT',
    description: 'Asesoramiento estratégico para optimizar tu infraestructura tecnológica.',
    detailedDescription:
      'Proporcionamos consultoría estratégica para optimizar tu infraestructura tecnológica. Nuestros expertos analizan tu situación actual, identifican oportunidades de mejora y desarrollan roadmaps tecnológicos para impulsar el crecimiento de tu negocio.',
    features: ['Arquitectura', 'Migración', 'Optimización', 'Soporte 24/7'],
    benefits: ['Optimización de costos', 'Mejora de eficiencia', 'Reducción de riesgos', 'Ventaja competitiva'],
    process: [
      'Evaluación de infraestructura actual',
      'Análisis de necesidades y objetivos',
      'Desarrollo de roadmap tecnológico',
      'Implementación de mejoras',
      'Seguimiento y optimización continua',
    ],
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Prometheus'],
    timeline: 'Variable según proyecto',
    team: '2-4 consultores',
    gradient: 'from-yellow-500 to-orange-500',
  },
] as const


