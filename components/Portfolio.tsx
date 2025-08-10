'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Eye } from 'lucide-react'
import Image from 'next/image'
import { projectsData } from '@/data/projects'

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeFilter, setActiveFilter] = useState('todos')

  const filters = [
    { id: 'todos', name: 'Todos' },
    { id: 'web', name: 'Web' },
    { id: 'mobile', name: 'Móvil' },
    { id: 'fullstack', name: 'Full-Stack' },
    { id: 'ecommerce', name: 'E-commerce' },
  ]

  const projects = projectsData

  const allowedIds = filters.map(f => f.id)
  const normalize = (s: string) => (s || '').trim().toLowerCase()
  const safeFilter = allowedIds.includes(activeFilter) ? activeFilter : 'todos'
  const filteredRaw = safeFilter === 'todos'
    ? projects
    : projects.filter(project => normalize(project.category) === normalize(safeFilter))
  const filteredProjects = filteredRaw.length > 0 ? filteredRaw : projects

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
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

  return (
    <section id="portfolio" className="section-padding gradient-bg overflow-x-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Nuestro <span className="gradient-text">Portafolio</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre algunos de nuestros proyectos más destacados que demuestran 
            nuestra experiencia y creatividad en el desarrollo tecnológico.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-dark-800/50 text-gray-300 hover:bg-dark-700 hover:text-white border border-dark-600'
              }`}
            >
              {filter.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          key={activeFilter}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl overflow-hidden card-hover"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.liveUrl}
                      className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                      aria-label={`Ver sitio en vivo: ${project.title}`}
                    >
                      <ExternalLink className="w-5 h-5 text-white" aria-hidden="true" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.githubUrl}
                      className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center hover:bg-dark-600 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      aria-label={`Ver repositorio: ${project.title}`}
                    >
                      <Github className="w-5 h-5 text-white" aria-hidden="true" />
                    </motion.a>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Destacado
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-dark-700 text-primary-400 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Project Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-300 group-hover:translate-x-2 transition-transform duration-300"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">Ver Proyecto</span>
                  </motion.button>
                  <div className="mt-3">
                    <button
                      onClick={() => window.dispatchEvent(new Event('openConsultation'))}
                      className="button-secondary text-sm"
                      aria-label={`Agendar consulta sobre ${project.title}`}
                    >
                      Agendar Consulta
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button-primary"
          >
            Ver Todos los Proyectos
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio 