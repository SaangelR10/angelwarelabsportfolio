'use client'

import { motion } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Servicios', href: '#services' },
    { name: 'Portafolio', href: '#portfolio' },
    { name: 'Sobre Nosotros', href: '#about' },
    { name: 'Testimonios', href: '#testimonials' },
    { name: 'Contacto', href: '#contact' },
  ]

  const services = [
    'Desarrollo Web',
    'Aplicaciones Móviles',
    'Desarrollo Full-Stack',
    'Consultoría IT',
    'Ciberseguridad',
    'Bases de Datos',
  ]

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  const contactInfo = [
    { icon: Mail, text: 'angelwarelabs@gmail.com' },
    { icon: Phone, text: '+57 321 923 8510' },
    { icon: MapPin, text: 'Cali, Colombia' },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-4 md:space-y-6 col-span-2 md:col-span-1 ml-4 md:ml-0">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-lg">A</span>
              </div>
              <span className="text-lg md:text-xl font-bold gradient-text">
                Angelware Labs
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base text-center md:text-left">
              Transformamos ideas en experiencias digitales excepcionales con 
              tecnología de vanguardia y diseño innovador.
            </p>
            <div className="flex justify-center md:justify-start space-x-3 md:space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 md:w-10 md:h-10 bg-dark-800 border border-dark-600 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-white transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 md:space-y-6 ml-4 md:ml-0">
            <h3 className="text-base md:text-lg font-semibold text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <button
                    onClick={() => scrollToSection(link.href.replace('#', ''))}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 transition-transform duration-300 text-sm md:text-base"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4 md:space-y-6 ml-4 md:ml-0">
            <h3 className="text-base md:text-lg font-semibold text-white">Servicios</h3>
            <ul className="space-y-2 md:space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <span className="text-gray-400 hover:text-primary-400 transition-colors duration-300 cursor-pointer text-sm md:text-base">
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 md:space-y-6 ml-4 md:ml-0">
            <h3 className="text-base md:text-lg font-semibold text-white">Contacto</h3>
            <div className="space-y-3 md:space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center space-x-2 md:space-x-3"
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <info.icon className="w-3 h-3 md:w-4 md:h-4 text-primary-400" />
                  </div>
                  <span className="text-gray-400 text-xs md:text-sm">{info.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

                 {/* Bottom Section */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5, duration: 0.8 }}
           className="border-t border-dark-700 mt-12 pt-8"
         >
           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
             <div className="text-gray-400 text-sm">
               © {currentYear} Angelware Labs. Todos los derechos reservados.
             </div>
             <div className="flex items-center space-x-6 text-sm">
               <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                 Política de Privacidad
               </a>
               <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                 Términos de Servicio
               </a>
               <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                 Cookies
               </a>
               <div className="text-gray-400">
                 Developed by{' '}
                 <a 
                   href="https://instagram.com/angelware.labs" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-primary-400 hover:text-primary-300 transition-colors duration-300 font-medium"
                 >
                   @angelware.labs
                 </a>
               </div>
             </div>
           </div>
         </motion.div>
      </div>
    </footer>
  )
}

export default Footer 