import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-6xl font-extrabold gradient-text mb-4">404</h1>
        <p className="text-gray-300 mb-8">No encontramos la página que buscas.</p>
        <Link href="#hero" className="button-primary">Volver al inicio</Link>
      </div>
    </main>
  )
}


