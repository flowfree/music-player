'use client'

import React, { useEffect, useState } from 'react'

export function SoundWaveAnimation({
  className = ''
}: {
  className?: string
}) {
  const [barAnimations, setBarAnimations] = useState<number[]>([])

  useEffect(() => {
   const animations = Array.from({ length: 7 }, () => Math.random() * 0.3 + 0.7)
    setBarAnimations(animations)
  }, [])

  return (
    <div className={`sound-wave flex gap-[1px] space-between ${className}`}>
      {barAnimations.map((animation, index) => (
        <div 
          key={index} 
          className="bar w-[2px] h-[20px] bg-indigo-700" 
          style={{ 
            animationName: 'waveAnimation',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate',
            animationDuration: `${animation}s` 
          }} 
        />
      ))}
      <style jsx>{`
        @keyframes waveAnimation {
          0% {
            transform: scaleY(1)
          }
          50% {
            transform: scaleY(0.5)
          }
          100% {
            transform: scaleY(1)
          }
        }
      `}</style>
    </div>
  )
}
