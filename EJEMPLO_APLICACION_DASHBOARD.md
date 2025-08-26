# Ejemplo de Aplicación del Dashboard de Personalización

## 📝 Cómo Hacer los Componentes Personalizables

Para que el dashboard funcione correctamente, necesitas añadir las clases dinámicas y atributos `data-section` a tus componentes existentes.

### 🎯 1. Identificar Secciones con data-section

Añade el atributo `data-section` o `id` a cada sección principal:

```tsx
// components/Hero.tsx
<section
  id="hero"                    // ✅ Necesario para la personalización
  data-section="hero"          // ✅ Alternativa si no tienes id
  className="min-h-screen dynamic-section-padding dynamic-bg-primary"
>
  {/* contenido */}
</section>

// components/Services.tsx  
<section
  id="services"
  className="dynamic-section-padding dynamic-bg-secondary"
>

// components/Portfolio.tsx
<section
  id="portfolio" 
  className="dynamic-section-padding dynamic-bg-tertiary"
>

// etc...
```

### 🎨 2. Aplicar Clases Dinámicas a Elementos

#### Títulos y Texto
```tsx
// ❌ Antes
<h1 className="text-5xl font-bold text-white">
  Transformamos Ideas en Experiencias Digitales
</h1>

// ✅ Después  
<h1 className="dynamic-title dynamic-title-font text-5xl font-bold">
  Transformamos Ideas en Experiencias Digitales
</h1>

// ❌ Antes
<h2 className="text-3xl font-semibold text-gray-200">
  Nuestros Servicios
</h2>

// ✅ Después
<h2 className="dynamic-subtitle dynamic-subtitle-font text-3xl font-semibold">
  Nuestros Servicios  
</h2>

// ❌ Antes
<p className="text-lg text-gray-300">
  Descripción del servicio aquí
</p>

// ✅ Después  
<p className="dynamic-body dynamic-body-font text-lg">
  Descripción del servicio aquí
</p>
```

#### Botones
```tsx
// ❌ Antes
<button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg">
  Ver Proyectos
</button>

// ✅ Después
<button className="dynamic-button dynamic-border-radius px-6 py-3 text-white">
  Ver Proyectos  
</button>
```

#### Navbar/Header
```tsx
// components/Header.tsx
// ❌ Antes
<nav className="bg-dark-900 border-b border-gray-800">

// ✅ Después  
<nav className="dynamic-navbar border-b border-gray-800" id="navbar">
```

### 🎛️ 3. Ejemplo Completo - Hero Component

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play, Star } from 'lucide-react'

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="hero"                                    // ✅ ID para personalización
      data-section="hero"                          // ✅ Atributo para targeting
      className="min-h-screen dynamic-section-padding dynamic-bg-primary animate-fade relative overflow-hidden"
    >
      {/* Background con glassmorphism dinámico */}
      <div className="absolute inset-0 glassmorphism-enabled" />
      
      {/* Container con ancho máximo dinámico */}
      <div className="dynamic-max-width mx-auto relative z-10">
        
        {/* Título Principal */}
        <motion.h1 
          className="dynamic-title dynamic-title-font text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ⭐ Innovación Tecnológica de Vanguardia
        </motion.h1>

        {/* Título Secundario con gradiente dinámico */}
        <motion.h2
          className="dynamic-title dynamic-title-font text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Transformamos
          <span className="block dynamic-subtitle" style={{ color: 'var(--color-accent)' }}>
            Ideas en
          </span>
          <span className="gradient-text">Experiencias Digitales</span>
        </motion.h2>

        {/* Descripción */}
        <motion.p
          className="dynamic-body dynamic-body-font text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Somos expertos en desarrollo web, aplicaciones móviles y
          soluciones tecnológicas que impulsan el crecimiento de tu negocio
          con tecnología de última generación.
        </motion.p>

        {/* Botones con estilos dinámicos */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button 
            onClick={() => scrollToSection('portfolio')}
            className="dynamic-button dynamic-border-radius px-8 py-4 text-white font-semibold shadows-enabled transition-all duration-300 transform hover:scale-105 group"
          >
            Ver Nuestros Proyectos
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-transparent border-2 dynamic-border-radius px-8 py-4 font-semibold transition-all duration-300 transform hover:scale-105 group"
            style={{ 
              borderColor: 'var(--color-buttons)',
              color: 'var(--color-buttons)'
            }}
          >
            <Play className="mr-2 h-5 w-5" />
            Iniciar Proyecto
          </button>
        </motion.div>

        {/* Estadísticas con colores dinámicos */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { number: "50+", label: "Proyectos Completados" },
            { number: "100%", label: "Clientes Satisfechos" },
            { number: "24/7", label: "Soporte Técnico" },
            { number: "5+", label: "Años de Experiencia" }
          ].map((stat, index) => (
            <div key={index} className="glassmorphism-enabled dynamic-border-radius p-4">
              <div 
                className="dynamic-title-font text-3xl font-bold mb-2"
                style={{ color: 'var(--color-accent)' }}
              >
                {stat.number}
              </div>
              <div className="dynamic-body dynamic-body-font text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
```

### 🎨 4. Clases CSS Disponibles

#### Colores Dinámicos
- `.dynamic-title` - Color de títulos
- `.dynamic-subtitle` - Color de subtítulos  
- `.dynamic-button` - Color de fondo de botones
- `.dynamic-navbar` - Color de fondo del navbar
- `.dynamic-bg-primary` - Fondo primario
- `.dynamic-bg-secondary` - Fondo secundario
- `.dynamic-bg-tertiary` - Fondo terciario

#### Tipografía Dinámica
- `.dynamic-title-font` - Fuente y tamaño de títulos
- `.dynamic-subtitle-font` - Fuente y tamaño de subtítulos
- `.dynamic-body-font` - Fuente y tamaño del cuerpo

#### Layout Dinámico
- `.dynamic-section-padding` - Padding de secciones
- `.dynamic-border-radius` - Bordes redondeados
- `.dynamic-max-width` - Ancho máximo

#### Efectos Condicionales
- `.glassmorphism-enabled` - Se aplica cuando glassmorphism está activado
- `.shadows-enabled` - Se aplica cuando las sombras están activadas

#### Animaciones
- `.animate-fade` - Animación fade in
- `.animate-slide` - Animación slide in
- `.animate-bounce` - Animación bounce in
- `.animate-pulse` - Animación pulse

### 🚀 5. Variables CSS Disponibles

Puedes usar directamente las variables CSS en estilos inline:

```tsx
<div style={{
  color: 'var(--color-titles)',
  backgroundColor: 'var(--color-buttons)',
  fontFamily: 'var(--font-title)',
  fontSize: 'var(--size-title)',
  borderRadius: 'var(--border-radius)',
  padding: 'var(--section-padding)'
}}>
  Contenido personalizable
</div>
```

### 🔄 6. Aplicación Automática

El contexto de temas aplica automáticamente los cambios cuando:
- Se cambian los colores
- Se actualiza la tipografía  
- Se modifican las configuraciones de layout
- Se personalizan las secciones individuales

### 📱 7. Responsive y Accesibilidad

Todas las clases dinámicas mantienen:
- Compatibilidad con Tailwind CSS
- Responsive design
- Transiciones suaves
- Accesibilidad (contraste, focus states)

---

**¡Ahora tu dashboard de personalización estará completamente funcional!** 🎉

Los usuarios podrán modificar todos los aspectos visuales de tu sitio web en tiempo real desde el panel glassmorphism premium.
