# 🚀 Portafolio Personal - Desarrollador Frontend

Un portafolio personal moderno y profesional optimizado para dispositivos móviles iOS (Safari) con soporte para Android (Chrome). Diseñado para impresionar a reclutadores y visitantes con un enfoque en tecnologías frontend de 2025.

## ✨ Características

### 🎨 Diseño y UX
- **Mobile-First**: Optimizado para móviles iOS (320px-480px) con soporte Android
- **Modo Oscuro**: Paleta de colores neón sobre fondo negro (#121212)
- **Animaciones Fluidas**: Framer Motion con 60 FPS optimizado para Safari
- **Accesibilidad**: WCAG 2.1, soporte VoiceOver, navegación por teclado
- **Responsivo**: Breakpoints optimizados para iOS, Android, tablet y desktop

### 🛠️ Tecnologías 2025
- **Framework**: Next.js 15 con App Router y SSR/SSG
- **Estilos**: Tailwind CSS con configuración mobile-first
- **Animaciones**: Framer Motion optimizado para móviles
- **Estado**: Zustand para gestión de estado global
- **UI Components**: shadcn/ui con Radix UI
- **Tipografía**: Inter + Poppins optimizadas para Retina
- **Despliegue**: Vercel con optimización automática

### 📱 Optimizaciones Móviles
- **iOS Safari**: Soporte completo para pantallas Retina, gestos táctiles
- **Android Chrome**: Optimización para dispositivos de gama media
- **Performance**: Core Web Vitals < 2s, lazy loading, optimización de imágenes
- **PWA Ready**: Service workers, manifest, instalación nativa

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/portfolio-personal.git
cd portfolio-personal
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/
│   ├── ui/                # Componentes base (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── progress.tsx
│   │   └── tooltip.tsx
│   └── sections/          # Secciones del portafolio
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Projects.tsx
│       ├── Skills.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
├── lib/
│   ├── utils.ts           # Utilidades y helpers
│   ├── site-config.ts     # Configuración del sitio
│   └── data.ts            # Datos del portafolio
├── store/
│   └── useStore.ts        # Store de Zustand
├── types/
│   └── index.ts           # Tipos TypeScript
└── hooks/                 # Custom hooks
```

## 🎯 Personalización

### 1. Datos Personales
Edita `src/lib/site-config.ts`:
```typescript
export const siteConfig: SiteConfig = {
  name: 'Tu Nombre',
  title: 'Tu Título Profesional',
  description: 'Tu descripción personal',
  // ... más configuraciones
}
```

### 2. Proyectos
Edita `src/lib/data.ts`:
```typescript
export const projects: Project[] = [
  {
    id: '1',
    title: 'Tu Proyecto',
    description: 'Descripción del proyecto',
    // ... más datos
  }
]
```

### 3. Habilidades
```typescript
export const skills: Skill[] = [
  {
    id: 'react',
    name: 'React',
    proficiency: 95,
    // ... más datos
  }
]
```

### 4. Colores y Temas
Edita `tailwind.config.ts`:
```typescript
colors: {
  accent: {
    neon: {
      blue: '#00DDEB',     // Tu color azul
      magenta: '#FF007A',  // Tu color magenta
      green: '#00FF7F',    // Tu color verde
    }
  }
}
```

## 📱 Optimizaciones Específicas

### iOS Safari
- Safe area insets para notch
- Optimización para pantallas Retina
- Gestos táctiles nativos
- Soporte para VoiceOver

### Android Chrome
- Optimización para dispositivos de gama media
- Ajustes de animaciones
- Soporte para teclados virtuales

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Otros Proveedores
- **Netlify**: Compatible con Next.js
- **Railway**: Soporte completo
- **DigitalOcean**: App Platform

## 📊 Performance

### Core Web Vitals Objetivo
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

### Optimizaciones Implementadas
- Lazy loading de imágenes
- Code splitting automático
- Preload de fuentes críticas
- Compresión de assets
- Cache optimizado

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo local
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
npm run type-check   # Verificación de tipos
```

## 📝 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

- **Email**: tu-email@ejemplo.com
- **LinkedIn**: [Tu Perfil](https://linkedin.com/in/tu-usuario)
- **GitHub**: [@tu-usuario](https://github.com/tu-usuario)
- **Portfolio**: [tu-portfolio.vercel.app](https://tu-portfolio.vercel.app)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Animaciones
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Vercel](https://vercel.com/) - Plataforma de despliegue

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
