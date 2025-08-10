'use client'

import { useEffect, useState } from 'react'
import ConsultationModal from '@/components/ConsultationModal'

const GlobalConsultation = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handler = () => setIsOpen(true)
    // @ts-ignore
    window.addEventListener('openConsultation', handler)
    return () => {
      // @ts-ignore
      window.removeEventListener('openConsultation', handler)
    }
  }, [])

  return (
    <ConsultationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
  )
}

export default GlobalConsultation


