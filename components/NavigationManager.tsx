'use client'

import { useState, useEffect } from 'react'
import PageTransition from './PageTransition'
import TeamPage from './TeamPage'

const NavigationManager = () => {
  const [currentPage, setCurrentPage] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const handleOpenTeamPage = () => {
      setCurrentPage('team')
      setIsTransitioning(true)
    }

    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.page) {
        setCurrentPage(event.state.page)
        setIsTransitioning(true)
      } else {
        setCurrentPage(null)
        setIsTransitioning(false)
      }
    }

    // Escuchar eventos personalizados
    window.addEventListener('openTeamPage', handleOpenTeamPage)
    
    // Escuchar cambios en el historial del navegador
    window.addEventListener('popstate', handlePopState)

    // Verificar si hay una página en el hash al cargar
    if (window.location.hash === '#team') {
      setCurrentPage('team')
      setIsTransitioning(true)
    }

    return () => {
      window.removeEventListener('openTeamPage', handleOpenTeamPage)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const handleClosePage = () => {
    setIsTransitioning(false)
    setTimeout(() => {
      setCurrentPage(null)
      // Restaurar el historial
      if (window.history.state?.page) {
        window.history.back()
      } else {
        window.history.pushState(null, '', window.location.pathname)
      }
    }, 300)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'team':
        return <TeamPage isVisible={isTransitioning} onClose={handleClosePage} />
      default:
        return null
    }
  }

  return (
    <PageTransition
      isVisible={isTransitioning}
      onClose={handleClosePage}
      direction="right"
    >
      {renderCurrentPage()}
    </PageTransition>
  )
}

export default NavigationManager