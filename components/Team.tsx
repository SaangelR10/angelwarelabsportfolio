'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Globe, 
  Code, 
  Database, 
  Shield, 
  Smartphone, 
  Zap,
  Star,
  Award,
  Users,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

interface TeamProps {
  isStandalone?: boolean
}

const Team = ({ isStandalone = false }: TeamProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // En modo standalone, siempre mostrar las animaciones
  const shouldAnimate = isStandalone ? true : inView

  const teamMembers = [
    {
      id: 1,
      name: 'Ángel Rodríguez',
      role: 'CEO & Full-Stack Developer',
      image: '/team/angel.jpg',
      bio: 'Líder visionario con más de 8 años de experiencia en desarrollo de software. Especialista en arquitecturas escalables y tecnologías emergentes.',
      skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
      experience: '8+ años',
      projects: '150+',
      social: {
        github: 'https://github.com/angelrodriguez',
        linkedin: 'https://linkedin.com/in/angelrodriguez',
        twitter: 'https://twitter.com/angelrodriguez',
        website: 'https://angelrodriguez.dev'
      },
      achievements: [
        'Certificado AWS Solutions Architect',
        'Contribuidor Open Source',
        'Speaker en conferencias tech'
      ],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'María González',
      role: 'Lead UI/UX Designer',
      image: '/team/maria.jpg',
      bio: 'Diseñadora creativa apasionada por crear experiencias de usuario excepcionales. Experta en diseño de productos digitales y investigación de usuarios.',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      experience: '6+ años',
      projects: '80+',
      social: {
        linkedin: 'https://linkedin.com/in/mariagonzalez',
        behance: 'https://behance.net/mariagonzalez',
        dribbble: 'https://dribbble.com/mariagonzalez'
      },
      achievements: [
        'Premio Diseño Digital 2023',
        'Certificación Google UX Design',
        'Mentora en bootcamps'
      ],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      name: 'Carlos Mendoza',
      role: 'Senior Backend Developer',
      image: '/team/carlos.jpg',
      bio: 'Desarrollador backend especializado en sistemas de alta disponibilidad y microservicios. Experto en optimización de bases de datos y APIs.',
      skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Kubernetes'],
      experience: '7+ años',
      projects: '120+',
      social: {
        github: 'https://github.com/carlosmendoza',
        linkedin: 'https://linkedin.com/in/carlosmendoza',
        stackoverflow: 'https://stackoverflow.com/users/carlosmendoza'
      },
      achievements: [
        'Certificado Kubernetes Administrator',
        'Contribuidor Spring Framework',
        'Autor de artículos técnicos'
      ],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      name: 'Ana Silva',
      role: 'Mobile Developer',
      image: '/team/ana.jpg',
      bio: 'Desarrolladora móvil especializada en aplicaciones nativas e híbridas. Experta en React Native y Flutter con enfoque en rendimiento.',
      skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      experience: '5+ años',
      projects: '60+',
      social: {
        github: 'https://github.com/anasilva',
        linkedin: 'https://linkedin.com/in/anasilva',
        medium: 'https://medium.com/@anasilva'
      },
      achievements: [
        'Apps con 1M+ descargas',
        'Certificación Flutter',
        'Speaker en FlutterConf'
      ],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      name: 'David Torres',
      role: 'DevOps Engineer',
      image: '/team/david.jpg',
      bio: 'Ingeniero DevOps especializado en automatización, CI/CD y infraestructura como código. Experto en cloud computing y seguridad.',
      skills: ['Docker', 'Terraform', 'Jenkins', 'AWS', 'Linux'],
      experience: '6+ años',
      projects: '90+',
      social: {
        github: 'https://github.com/davidtorres',
        linkedin: 'https://linkedin.com/in/davidtorres',
        blog: 'https://devopsdavid.com'
      },
      achievements: [
        'Certificado AWS DevOps',
        'Contribuidor Terraform',
        'Instructor en cursos DevOps'
      ],
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 6,
      name: 'Laura Fernández',
      role: 'QA Engineer',
      image: '/team/laura.jpg',
      bio: 'Ingeniera de calidad especializada en testing automatizado y aseguramiento de calidad. Experta en metodologías ágiles y testing de performance.',
      skills: ['Selenium', 'Cypress', 'Jest', 'Postman', 'JMeter'],
      experience: '4+ años',
      projects: '70+',
      social: {
        linkedin: 'https://linkedin.com/in/laurafernandez',
        github: 'https://github.com/laurafernandez',
        twitter: 'https://twitter.com/laurafernandez'
      },
      achievements: [
        'Certificación ISTQB',
        'Líder de testing automation',
        'Organizadora de meetups QA'
      ],
      gradient: 'from-yellow-500 to-orange-500'
    }
  ]

  const stats = [
    {
      number: '50+',
      label: 'Proyectos Completados',
      icon: CheckCircle
    },
    {
      number: '8+',
      label: 'Años de Experiencia',
      icon: Clock
    },
    {
      number: '100%',
      label: 'Clientes Satisfechos',
      icon: Star
    },
    {
      number: '24/7',
      label: 'Soporte Técnico',
      icon: Users
    }
  ]

  const values = [
    {
      icon: Code,
      title: 'Innovación Constante',
      description: 'Siempre exploramos las últimas tecnologías para ofrecer soluciones de vanguardia.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Calidad Garantizada',
      description: 'Cada línea de código pasa por rigurosos controles de calidad y testing.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Trabajo en Equipo',
      description: 'Colaboramos estrechamente para lograr resultados excepcionales juntos.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Resultados Rápidos',
      description: 'Entregamos proyectos en tiempo récord sin comprometer la calidad.',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <section id="team" ref={isStandalone ? undefined : ref} className={`${isStandalone ? 'min-h-screen pt-20' : 'section-padding'} gradient-bg`}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Nuestro Equipo
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conoce a los profesionales apasionados que hacen posible la transformación digital de tu negocio
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-6 text-center group hover:border-primary-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Members Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300 h-full">
                {/* Member Image */}
                <div className="relative mb-6">
                  <div className={`w-24 h-24 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-400 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2 text-sm">Especialidades:</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-dark-700 text-primary-400 text-xs rounded-full border border-dark-600"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="px-2 py-1 bg-dark-700 text-gray-400 text-xs rounded-full border border-dark-600">
                        +{member.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{member.experience}</div>
                    <div className="text-xs text-gray-400">Experiencia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{member.projects}</div>
                    <div className="text-xs text-gray-400">Proyectos</div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2 text-sm">Logros:</h4>
                  <ul className="space-y-1">
                    {member.achievements.slice(0, 2).map((achievement, idx) => (
                      <li key={idx} className="text-gray-400 text-xs flex items-center">
                        <Award className="w-3 h-3 text-primary-400 mr-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-dark-700 hover:bg-primary-500 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-dark-700 hover:bg-primary-500 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-dark-700 hover:bg-primary-500 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.website && (
                    <a
                      href={member.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-dark-700 hover:bg-primary-500 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Nuestros Valores
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Los principios que guían nuestro trabajo y nos permiten entregar resultados excepcionales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
                             <motion.div
                 key={value.title}
                 initial={{ opacity: 0, y: 30 }}
                 animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                 transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                 className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-6 text-center group-30 transition-all duration-300"
               >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-2xl p-8 border border-primary-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Listo para trabajar con nuestro equipo?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Nuestro equipo está listo para transformar tu visión en realidad. 
              Contáctanos y comencemos a construir algo increíble juntos.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (isStandalone) {
                  // En modo standalone, cerrar la vista actual
                  window.history.back()
                } else {
                  window.location.hash = 'contact'
                }
              }}
              className="button-primary flex items-center space-x-2 mx-auto"
            >
              <span>Iniciar Proyecto</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Team