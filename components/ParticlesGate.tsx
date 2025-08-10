'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Particles = dynamic(() => import('./Particles'), {
  ssr: false,
  loading: () => null,
})

const ParticlesGate = () => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isReduced = mql.matches
    const isDesktop = window.innerWidth >= 768 // md breakpoint
    setEnabled(!isReduced && isDesktop)

    const onResize = () => {
      const desktop = window.innerWidth >= 768
      setEnabled(!mql.matches && desktop)
    }
    const onChange = () => {
      const desktop = window.innerWidth >= 768
      setEnabled(!mql.matches && desktop)
    }
    window.addEventListener('resize', onResize)
    mql.addEventListener?.('change', onChange)
    return () => {
      window.removeEventListener('resize', onResize)
      mql.removeEventListener?.('change', onChange)
    }
  }, [])

  if (!enabled) return null
  return <Particles />
}

export default ParticlesGate


