'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const reduceMotion = mediaQuery.matches

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle colors that match the design
    const colors = [
      'rgba(99, 102, 241, 0.3)', // primary-500 with opacity
      'rgba(168, 85, 247, 0.2)', // accent-500 with opacity
      'rgba(59, 130, 246, 0.15)', // blue variant
      'rgba(147, 51, 234, 0.1)', // purple variant
    ]

    // Initialize particles
    const initParticles = () => {
      const maxCount = reduceMotion ? 40 : 150
      const particleCount = Math.max(20, Math.min(window.innerWidth / (reduceMotion ? 30 : 15), maxCount))
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8, // Slightly faster movement
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 3 + 1, // Larger particles
          opacity: Math.random() * 0.6 + 0.2, // More visible
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Update position
        const speedFactor = reduceMotion ? 0.3 : 1
        particle.x += particle.vx * speedFactor
        particle.y += particle.vy * speedFactor

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Draw connections
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index === otherIndex) return

          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (!reduceMotion && distance < 120) {
            ctx.save()
            ctx.globalAlpha = (120 - distance) / 120 * 0.15 // More visible connections
            ctx.strokeStyle = particle.color
            ctx.lineWidth = 0.8 // Thicker lines
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    initParticles()
    let visibilityHandler: (() => void) | null = null
    const start = () => { if (!animationRef.current) animate() }
    const stop = () => { if (animationRef.current) { cancelAnimationFrame(animationRef.current); animationRef.current = undefined }
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop(); else start()
    })
    start()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      stop()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block"
      style={{
        background: 'transparent'
      }}
    />
  )
}

export default Particles