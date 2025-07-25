'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { 
  Globe, 
  Smartphone, 
  Code, 
  Database, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import ServiceModal from './ServiceModal'

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedService, setSelectedService] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const services = [
    {
      icon: Globe,
      title: 'Desarrollo Web',
      description: 'Sitios web modernos, responsivos y optimizados para SEO con las últimas tecnologías.',
      detailedDescription: 'Creamos sitios web profesionales que no solo se ven increíbles, sino que también convierten visitantes en clientes. Nuestro enfoque incluye diseño responsivo, optimización SEO, velocidad de carga excepcional y experiencia de usuario intuitiva.',
      features: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'SEO Optimizado'],
      benefits: [
        'Mayor visibilidad en buscadores',
        'Experiencia de usuario excepcional',
        'Velocidad de carga optimizada',
        'Diseño adaptativo para todos los dispositivos'
      ],
      process: [
        'Análisis de requisitos y objetivos',
        'Diseño de wireframes y prototipos',
        'Desarrollo frontend y backend',
        'Optimización SEO y rendimiento',
        'Pruebas y despliegue'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Vercel', 'AWS'],
      timeline: '4-8 semanas',
      team: '2-3 desarrolladores',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Smartphone,
      title: 'Aplicaciones Móviles',
      description: 'Apps nativas e híbridas para iOS y Android con experiencia de usuario excepcional.',
      detailedDescription: 'Desarrollamos aplicaciones móviles nativas e híbridas que destacan en las tiendas de aplicaciones. Nuestras apps combinan diseño intuitivo, rendimiento excepcional y funcionalidades avanzadas para maximizar el engagement de los usuarios.',
      features: ['React Native', 'Flutter', 'iOS & Android', 'App Store Ready'],
      benefits: [
        'Presencia en iOS y Android',
        'Experiencia de usuario nativa',
        'Rendimiento optimizado',
        'Actualizaciones automáticas'
      ],
      process: [
        'Análisis de mercado y usuarios',
        'Diseño de UX/UI móvil',
        'Desarrollo nativo/híbrido',
        'Pruebas en dispositivos reales',
        'Publicación en tiendas'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'App Store Connect', 'Google Play Console'],
      timeline: '8-12 semanas',
      team: '3-4 desarrolladores',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Code,
      title: 'Desarrollo Full-Stack',
      description: 'Soluciones completas desde el frontend hasta el backend con arquitectura escalable.',
      detailedDescription: 'Ofrecemos soluciones full-stack completas que abarcan desde la interfaz de usuario hasta la infraestructura del servidor. Nuestras aplicaciones están construidas con arquitecturas escalables y tecnologías modernas para garantizar el crecimiento futuro.',
      features: ['Node.js & Express', 'Python & Django', 'PostgreSQL', 'AWS & Vercel'],
      benefits: [
        'Arquitectura escalable',
        'Desarrollo ágil y eficiente',
        'Integración completa',
        'Mantenimiento simplificado'
      ],
      process: [
        'Análisis de arquitectura',
        'Desarrollo de API y backend',
        'Implementación frontend',
        'Integración y pruebas',
        'Despliegue y monitoreo'
      ],
      technologies: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes'],
      timeline: '12-16 semanas',
      team: '4-5 desarrolladores',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Database,
      title: 'Bases de Datos',
      description: 'Diseño e implementación de bases de datos robustas y optimizadas para tu negocio.',
      detailedDescription: 'Diseñamos e implementamos bases de datos robustas que son la base de aplicaciones escalables. Nuestro enfoque incluye optimización de consultas, seguridad de datos, respaldos automáticos y monitoreo continuo del rendimiento.',
      features: ['PostgreSQL', 'MongoDB', 'Redis', 'Optimización'],
      benefits: [
        'Rendimiento optimizado',
        'Seguridad de datos avanzada',
        'Escalabilidad horizontal',
        'Respaldo y recuperación automática'
      ],
      process: [
        'Análisis de requisitos de datos',
        'Diseño de esquema y relaciones',
        'Implementación y migración',
        'Optimización de consultas',
        'Configuración de respaldos'
      ],
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Elasticsearch', 'AWS RDS', 'Docker'],
      timeline: '2-4 semanas',
      team: '1-2 especialistas',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Shield,
      title: 'Ciberseguridad',
      description: 'Protección integral de datos y aplicaciones con las mejores prácticas de seguridad.',
      detailedDescription: 'Protegemos tu infraestructura digital con las mejores prácticas de ciberseguridad. Nuestros servicios incluyen auditorías de seguridad, implementación de protocolos SSL/TLS, autenticación multifactor y monitoreo continuo de amenazas.',
      features: ['SSL/TLS', 'Autenticación', 'Encriptación', 'Auditorías'],
      benefits: [
        'Protección contra amenazas',
        'Cumplimiento de regulaciones',
        'Confianza del cliente',
        'Reducción de riesgos'
      ],
      process: [
        'Evaluación de vulnerabilidades',
        'Implementación de seguridad',
        'Configuración de monitoreo',
        'Pruebas de penetración',
        'Documentación y capacitación'
      ],
      technologies: ['SSL/TLS', 'OAuth 2.0', 'JWT', 'Let\'s Encrypt', 'Cloudflare', 'AWS Security', 'Docker Security'],
      timeline: '3-6 semanas',
      team: '2-3 especialistas',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Consultoría IT',
      description: 'Asesoramiento estratégico para optimizar tu infraestructura tecnológica.',
      detailedDescription: 'Proporcionamos consultoría estratégica para optimizar tu infraestructura tecnológica. Nuestros expertos analizan tu situación actual, identifican oportunidades de mejora y desarrollan roadmaps tecnológicos para impulsar el crecimiento de tu negocio.',
      features: ['Arquitectura', 'Migración', 'Optimización', 'Soporte 24/7'],
      benefits: [
        'Optimización de costos',
        'Mejora de eficiencia',
        'Reducción de riesgos',
        'Ventaja competitiva'
      ],
      process: [
        'Evaluación de infraestructura actual',
        'Análisis de necesidades y objetivos',
        'Desarrollo de roadmap tecnológico',
        'Implementación de mejoras',
        'Seguimiento y optimización continua'
      ],
      technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Prometheus'],
      timeline: 'Variable según proyecto',
      team: '2-4 consultores',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const handleServiceClick = (service: any) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
  }

  return (
    <section id="services" className="section-padding gradient-bg">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Nuestros <span className="gradient-text">Servicios</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Ofrecemos soluciones tecnológicas integrales que impulsan el crecimiento 
            de tu negocio con tecnología de vanguardia y diseño excepcional.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-8 hover:border-primary-500/30 transition-all duration-300 card-hover"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleServiceClick(service)}
                className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-300 group-hover:translate-x-2 transition-transform duration-300 cursor-pointer"
              >
                <span className="text-sm font-medium">Saber más</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button-primary"
          >
            Solicitar Consulta Gratuita
          </motion.button>
        </motion.div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          service={selectedService}
        />
      )}
    </section>
  )
}

export default Services 