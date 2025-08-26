'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Aquí podrías enviar el error a un sistema de logging
    // console.error(error)
  }, [error])

  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Ocurrió un error</h1>
        <p className="text-gray-400 mb-6">Por favor intenta nuevamente. Si persiste, contáctanos.</p>
        <button onClick={reset} className="button-primary">Reintentar</button>
      </div>
    </main>
  )
}





