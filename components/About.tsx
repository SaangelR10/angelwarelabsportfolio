'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Users, 
  Target, 
  Award, 
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { icon: Users, number: '100+', label: 'Clientes Satisfechos' },
    { icon: Target, number: '200+', label: 'Proyectos Exitosos' },
    { icon: Award, number: '15+', label: 'Premios Ganados' },
    { icon: Clock, number: '5+', label: 'Años de Experiencia' },
  ]

  const values = [
    {
      title: 'Innovación Constante',
      description: 'Siempre exploramos las últimas tecnologías para ofrecer soluciones de vanguardia.',
      icon: '🚀'
    },
    {
      title: 'Calidad Premium',
      description: 'Cada proyecto se desarrolla con los más altos estándares de calidad y excelencia.',
      icon: '⭐'
    },
    {
      title: 'Atención Personalizada',
      description: 'Trabajamos de cerca con cada cliente para entender sus necesidades específicas.',
      icon: '🤝'
    },
    {
      title: 'Resultados Medibles',
      description: 'Nos enfocamos en generar valor tangible y resultados medibles para tu negocio.',
      icon: '📈'
    }
  ]

  const technologies = [
    'React & Next.js', 'TypeScript', 'Node.js', 'Python',
    'PostgreSQL', 'MongoDB', 'AWS', 'Docker',
    'React Native', 'Flutter', 'Tailwind CSS', 'Framer Motion'
  ]

  return (
    <section id="about" className="section-padding gradient-bg">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Section Header */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Sobre <span className="gradient-text">Angelware Labs</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Somos una empresa de desarrollo tecnológico apasionada por crear 
                experiencias digitales excepcionales que transforman ideas en realidades.
              </p>
            </div>

            {/* Mission */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Nuestra Misión</h3>
              <p className="text-gray-300 leading-relaxed">
                Impulsar el crecimiento de nuestros clientes a través de soluciones 
                tecnológicas innovadoras, combinando creatividad, experiencia técnica 
                y un enfoque centrado en resultados.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Nuestros Valores</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    className="flex items-start space-x-3"
                  >
                    <span className="text-2xl">{value.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{value.title}</h4>
                      <p className="text-sm text-gray-400">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Tecnologías</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
                    className="px-3 py-1 bg-dark-700 text-primary-400 text-sm rounded-full border border-dark-600"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Usar history.pushState para navegación suave
                  window.history.pushState({ page: 'team' }, '', '#team')
                  // Disparar evento personalizado para abrir la página del equipo
                  window.dispatchEvent(new CustomEvent('openTeamPage'))
                }}
                className="button-primary flex items-center space-x-2"
              >
                <span>Conoce Nuestro Equipo</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.hash = 'contact'}
                className="button-secondary flex items-center space-x-2"
              >
                <span>Iniciar Proyecto</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Stats & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
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
            </div>

            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-2xl p-8 border border-primary-500/20">
                <div className="text-center space-y-4">
                  <div className="text-4xl">🎯</div>
                  <h3 className="text-xl font-bold text-white">Enfoque en Resultados</h3>
                  <p className="text-gray-300">
                    Cada proyecto que desarrollamos está diseñado para generar 
                    valor real y resultados medibles para tu negocio.
                  </p>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500/20 rounded-full"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent-500/20 rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About 