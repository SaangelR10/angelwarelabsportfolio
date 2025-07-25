'use client'

import { useState, useEffect } from 'react'

interface DebugPanelProps {
  isModalOpen: boolean
  selectedService: any
  clickCount: number
  lastClickTime: string
  userAgent: string
  isMobile: boolean
  hash: string
}

const DebugPanel = ({ 
  isModalOpen, 
  selectedService, 
  clickCount, 
  lastClickTime, 
  userAgent, 
  isMobile, 
  hash 
}: DebugPanelProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const newLog = `[${new Date().toLocaleTimeString()}] Modal: ${isModalOpen ? 'OPEN' : 'CLOSED'} | Service: ${selectedService?.title || 'NONE'} | Clicks: ${clickCount}`
    setLogs(prev => [...prev.slice(-9), newLog])
  }, [isModalOpen, selectedService, clickCount])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono z-[99999] max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-yellow-400">DEBUG PANEL</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Modal State:</span>
          <span className={isModalOpen ? 'text-green-400' : 'text-red-400'}>
            {isModalOpen ? 'OPEN' : 'CLOSED'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Service:</span>
          <span className="text-blue-400">{selectedService?.title || 'NONE'}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Clicks:</span>
          <span className="text-yellow-400">{clickCount}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Last Click:</span>
          <span className="text-gray-400">{lastClickTime}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Mobile:</span>
          <span className={isMobile ? 'text-green-400' : 'text-red-400'}>
            {isMobile ? 'YES' : 'NO'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Hash:</span>
          <span className="text-purple-400">{hash}</span>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-gray-700">
        <h4 className="font-bold text-gray-400 mb-1">LOGS:</h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className="text-gray-300 text-xs">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DebugPanel