import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores específica para portafolio personal
        background: {
          primary: '#121212',    // Negro principal
          secondary: '#1A1A1A',  // Gris oscuro
          tertiary: '#0F0F0F',   // Negro más oscuro
        },
        accent: {
          neon: {
            blue: '#00DDEB',     // Azul neón
            magenta: '#FF007A',  // Magenta neón
            green: '#00FF7F',    // Verde neón
          }
        },
        text: {
          primary: '#FFFFFF',    // Blanco para títulos
          secondary: '#D3D3D3',  // Gris claro para texto secundario
          muted: '#9CA3AF',      // Gris más oscuro para texto muted
        },
        border: {
          neon: '#00DDEB',
          subtle: '#2A2A2A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Tamaños optimizados para móviles iOS
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],  // Texto base móvil
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],   // Subtítulos móvil
        '3xl': ['28px', { lineHeight: '36px' }],
        '4xl': ['32px', { lineHeight: '40px' }],   // Títulos móvil
        '5xl': ['36px', { lineHeight: '44px' }],
        '6xl': ['48px', { lineHeight: '56px' }],
      },
      spacing: {
        // Espaciado optimizado para móviles
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-neon': 'linear-gradient(135deg, #00DDEB 0%, #FF007A 50%, #00FF7F 100%)',
        'gradient-dark': 'linear-gradient(135deg, #121212 0%, #1A1A1A 100%)',
      },
      screens: {
        // Breakpoints optimizados para móviles iOS
        'xs': '320px',
        'sm': '480px',   // Móvil iOS máximo
        'md': '768px',   // Tablet
        'lg': '1024px',  // Tablet landscape
        'xl': '1280px',  // Desktop
        '2xl': '1536px',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 221, 235, 0.5)',
        'neon-magenta': '0 0 20px rgba(255, 0, 122, 0.5)',
        'neon-green': '0 0 20px rgba(0, 255, 127, 0.5)',
        'glow': '0 0 40px rgba(0, 221, 235, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config