'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

type Provider = 'plausible' | 'ga4' | null

const STORAGE_KEY = 'analytics-consent'

const AnalyticsConsent = () => {
  const [consent, setConsent] = useState<boolean | null>(null)
  const [provider, setProvider] = useState<Provider>(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'granted') setConsent(true)
    else if (saved === 'denied') setConsent(false)
    else setConsent(null)

    // Elegir proveedor por variable de entorno
    const hasPlausible = !!process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
    const hasGA4 = !!process.env.NEXT_PUBLIC_GA4_ID
    if (hasPlausible) setProvider('plausible')
    else if (hasGA4) setProvider('ga4')
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'granted')
    setConsent(true)
  }
  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'denied')
    setConsent(false)
  }

  return (
    <>
      {consent === true && provider === 'plausible' && process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
        <Script
          strategy="afterInteractive"
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
        />
      )}
      {consent === true && provider === 'ga4' && process.env.NEXT_PUBLIC_GA4_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {consent === null && (
        <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto z-[10000] max-w-xl bg-dark-800 border border-dark-700 rounded-xl p-4 shadow-xl">
          <div className="flex items-start space-x-3">
            <div className="flex-1">
              <p className="text-white font-semibold">Privacidad y Analíticas</p>
              <p className="text-sm text-gray-300 mt-1">Usamos analíticas para mejorar la experiencia. ¿Aceptas el uso de cookies de medición?</p>
            </div>
            <div className="flex-shrink-0 space-x-2">
              <button onClick={decline} className="bg-dark-700 hover:bg-dark-600 text-white px-3 py-2 rounded-lg text-sm">Rechazar</button>
              <button onClick={accept} className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-2 rounded-lg text-sm">Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AnalyticsConsent


