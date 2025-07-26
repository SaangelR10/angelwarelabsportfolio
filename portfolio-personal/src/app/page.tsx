'use client'

import React from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import Header from '@/components/sections/Header'
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background-primary">
        <Header />
        <main>
          <Hero />
          {/* Aquí irán las demás secciones */}
        </main>
      </div>
    </TooltipProvider>
  )
}
