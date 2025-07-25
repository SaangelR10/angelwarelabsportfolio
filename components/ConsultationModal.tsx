'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, CheckCircle, Star, Clock, Users, Zap, Shield, Code, Database, Globe, Smartphone, Mail, Phone, User, MessageSquare, Upload, File, Trash2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

const ConsultationModal = ({ isOpen, onClose }: ConsultationModalProps) => {
  const [selectedService, setSelectedService] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    budget: '',
    timeline: ''
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState(1)

  const services = [
    {
      id: 'desarrollo-web',
      icon: Globe,
      title: 'Desarrollo Web',
      description: 'Sitios web modernos y responsivos',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'apps-moviles',
      icon: Smartphone,
      title: 'Aplicaciones Móviles',
      description: 'Apps nativas e híbridas',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'full-stack',
      icon: Code,
      title: 'Desarrollo Full-Stack',
      description: 'Soluciones completas',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'bases-datos',
      icon: Database,
      title: 'Bases de Datos',
      description: 'Diseño e implementación',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'ciberseguridad',
      icon: Shield,
      title: 'Ciberseguridad',
      description: 'Protección integral',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'consultoria-it',
      icon: Zap,
      title: 'Consultoría IT',
      description: 'Asesoramiento estratégico',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setStep(2)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateAndAddFiles = (files: File[]) => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/gif',
      'text/plain',
      'application/zip',
      'application/x-rar-compressed'
    ]
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`El archivo ${file.name} es demasiado grande. Máximo 10MB.`)
        return false
      }
      
      if (!allowedTypes.includes(file.type)) {
        alert(`El archivo ${file.name} no es un tipo válido.`)
        return false
      }
      
      return true
    })
    
    setUploadedFiles(prev => [...prev, ...validFiles])
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    validateAndAddFiles(files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    validateAndAddFiles(files)
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄'
    if (fileType.includes('word') || fileType.includes('document')) return '📝'
    if (fileType.includes('image')) return '🖼️'
    if (fileType.includes('zip') || fileType.includes('rar')) return '📦'
    return '📎'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { selectedService, formData, uploadedFiles })
    // Aquí iría la lógica para enviar el formulario
    setStep(3)
  }

  const resetForm = () => {
    setSelectedService('')
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      budget: '',
      timeline: ''
    })
    setUploadedFiles([])
    setStep(1)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const selectedServiceData = services.find(s => s.id === selectedService)
  const ServiceIcon = selectedServiceData?.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-dark-800/95 backdrop-blur-xl border-b border-dark-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      Consulta Gratuita
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                      {step === 1 ? 'Selecciona el servicio que te interesa' : 
                       step === 2 ? 'Completa tus datos' : 
                       '¡Gracias por tu interés!'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 bg-dark-700 hover:bg-dark-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      ¿En qué servicio estás interesado?
                    </h3>
                    <p className="text-gray-400">
                      Selecciona el servicio que mejor se adapte a tus necesidades
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service) => {
                      const ServiceIcon = service.icon
                      return (
                        <motion.div
                          key={service.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleServiceSelect(service.id)}
                          className="group cursor-pointer bg-dark-700/50 hover:bg-dark-700 border border-dark-600 hover:border-primary-500/30 rounded-xl p-4 transition-all duration-300"
                        >
                          <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                            <ServiceIcon className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-white font-semibold mb-1 group-hover:text-primary-400 transition-colors duration-300">
                            {service.title}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {service.description}
                          </p>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <button
                      onClick={() => setStep(1)}
                      className="text-primary-400 hover:text-primary-300 transition-colors duration-300"
                    >
                      ← Volver
                    </button>
                    {selectedServiceData && (
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${selectedServiceData.gradient} rounded-lg flex items-center justify-center`}>
                          {ServiceIcon && <ServiceIcon className="w-4 h-4 text-white" />}
                        </div>
                        <span className="text-white font-medium">{selectedServiceData.title}</span>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none transition-colors duration-300"
                          placeholder="Tu nombre completo"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none transition-colors duration-300"
                          placeholder="tu@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none transition-colors duration-300"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">
                          Empresa
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none transition-colors duration-300"
                          placeholder="Nombre de tu empresa"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">
                          Presupuesto aproximado
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors duration-300"
                        >
                          <option value="">Selecciona un rango</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-25k">$10,000 - $25,000</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="50k+">$50,000+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">
                          Timeline del proyecto
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors duration-300"
                        >
                          <option value="">Selecciona un timeline</option>
                          <option value="1-3-months">1-3 meses</option>
                          <option value="3-6-months">3-6 meses</option>
                          <option value="6-12-months">6-12 meses</option>
                          <option value="12+months">12+ meses</option>
                        </select>
                      </div>
                    </div>

                                         <div>
                       <label className="block text-white font-medium mb-2">
                         Describe tu proyecto *
                       </label>
                       <textarea
                         name="message"
                         value={formData.message}
                         onChange={handleInputChange}
                         required
                         rows={4}
                         className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none transition-colors duration-300 resize-none"
                         placeholder="Cuéntanos sobre tu proyecto, objetivos, requisitos específicos..."
                       />
                     </div>

                     {/* File Upload Section */}
                     <div>
                       <label className="block text-white font-medium mb-2">
                         Documentación del proyecto
                       </label>
                       <div className="space-y-4">
                         {/* Upload Area */}
                         <div 
                           onClick={() => fileInputRef.current?.click()}
                           onDragOver={handleDragOver}
                           onDragLeave={handleDragLeave}
                           onDrop={handleDrop}
                           className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${
                             isDragOver 
                               ? 'border-primary-500 bg-primary-500/10' 
                               : 'border-dark-600 hover:border-primary-500 bg-dark-700/50 hover:bg-dark-700'
                           }`}
                         >
                           <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                           <p className="text-white font-medium mb-1">
                             Subir archivos
                           </p>
                           <p className="text-gray-400 text-sm">
                             {isDragOver ? 'Suelta los archivos aquí' : 'Arrastra archivos aquí o haz clic para seleccionar'}
                           </p>
                           <p className="text-gray-500 text-xs mt-2">
                             PDF, Word, imágenes, ZIP • Máximo 10MB por archivo
                           </p>
                           <input
                             ref={fileInputRef}
                             type="file"
                             multiple
                             onChange={handleFileUpload}
                             className="hidden"
                             accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt,.zip,.rar"
                           />
                         </div>

                         {/* Uploaded Files List */}
                         {uploadedFiles.length > 0 && (
                           <div className="space-y-2">
                             <h4 className="text-white font-medium text-sm">
                               Archivos subidos ({uploadedFiles.length})
                             </h4>
                             <div className="space-y-2 max-h-32 overflow-y-auto">
                               {uploadedFiles.map((file, index) => (
                                 <motion.div
                                   key={index}
                                   initial={{ opacity: 0, y: -10 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   className="flex items-center justify-between bg-dark-700/50 border border-dark-600 rounded-lg p-3"
                                 >
                                   <div className="flex items-center space-x-3">
                                     <span className="text-lg">{getFileIcon(file.type)}</span>
                                     <div className="flex-1 min-w-0">
                                       <p className="text-white text-sm font-medium truncate">
                                         {file.name}
                                       </p>
                                       <p className="text-gray-400 text-xs">
                                         {formatFileSize(file.size)}
                                       </p>
                                     </div>
                                   </div>
                                   <button
                                     type="button"
                                     onClick={() => removeFile(index)}
                                     className="text-red-400 hover:text-red-300 transition-colors duration-300 p-1"
                                   >
                                     <Trash2 className="w-4 h-4" />
                                   </button>
                                 </motion.div>
                               ))}
                             </div>
                           </div>
                         )}
                       </div>
                     </div>

                    <div className="flex space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-dark-700 hover:bg-dark-600 text-white py-3 px-6 rounded-lg transition-colors duration-300 font-medium"
                      >
                        Volver
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium flex items-center justify-center space-x-2"
                      >
                        <span>Enviar Consulta</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6 py-8"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    ¡Consulta Enviada!
                  </h3>
                  
                  <p className="text-gray-400 max-w-md mx-auto">
                    Gracias por tu interés. Nos pondremos en contacto contigo en las próximas 24 horas para discutir tu proyecto.
                  </p>
                  
                  <div className="flex space-x-4 justify-center">
                    <button
                      onClick={handleClose}
                      className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg transition-colors duration-300 font-medium"
                    >
                      Cerrar
                    </button>
                    <button
                      onClick={resetForm}
                      className="bg-dark-700 hover:bg-dark-600 text-white py-3 px-6 rounded-lg transition-colors duration-300 font-medium"
                    >
                      Nueva Consulta
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConsultationModal