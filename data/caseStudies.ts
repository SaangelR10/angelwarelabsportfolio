export type CaseStudy = {
  id: number
  client: string
  industry: string
  title: string
  challenge: string
  solution: string[]
  results: { label: string; value: string }[]
  image: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    client: 'TechStart',
    industry: 'E‑commerce',
    title: 'Aumento de conversión en tienda online',
    challenge:
      'El funnel presentaba alta fricción en checkout y tiempos de carga lentos en mobile.',
    solution: [
      'Migración a Next.js 14 con imágenes optimizadas y edge caching',
      'Simplificación de formulario y métodos de pago (Stripe Elements)',
      'Tests A/B para copy y prioridades de CTA',
    ],
    results: [
      { label: 'Conversión', value: '+38%' },
      { label: 'TTFB', value: '-42%' },
      { label: 'Rebote mobile', value: '-27%' },
    ],
    image:
      'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    client: 'DataFlow',
    industry: 'SaaS Analytics',
    title: 'Panel en tiempo real y arquitectura escalable',
    challenge:
      'Necesitaban streaming de métricas en tiempo real y reducción de costos en picos.',
    solution: [
      'Microservicios con colas y WebSockets (NestJS + Redis)',
      'Materialización de vistas para dashboards en PostgreSQL',
      'Auto‑scaling y observabilidad (AWS + Grafana)',
    ],
    results: [
      { label: 'Latencia dashboards', value: '-60%' },
      { label: 'Costos en picos', value: '-25%' },
      { label: 'Disponibilidad', value: '99.95%' },
    ],
    image:
      'https://images.unsplash.com/photo-1534759846116-5797b1d1f1ed?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    client: 'EcoSolutions',
    industry: 'Servicios',
    title: 'App móvil con onboarding sin fricción',
    challenge:
      'Onboarding con abandono alto y push notifications ineficientes.',
    solution: [
      'Onboarding progresivo con validación en cliente y server',
      'Push segmentadas por comportamiento (Firebase)',
      'Optimización de assets y navegación nativa (React Native)',
    ],
    results: [
      { label: 'Activación', value: '+44%' },
      { label: 'Retención 30d', value: '+19%' },
      { label: 'Crash‑free', value: '99.9%' },
    ],
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
  },
]


