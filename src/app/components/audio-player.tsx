'use client'

import React, { useRef, useState } from 'react'

export function AudioPlayer({ 
  src 
}: {
  src: string
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const updateProgress = () => {
    const audio = audioRef.current
    if (audio) {
      setProgress((audio.currentTime / audio.duration) * 100)
    }
  }

  return (
    <div>
      <audio ref={audioRef} src={src} onTimeUpdate={updateProgress} preload="none" />
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <progress value={progress} max="100"></progress>
    </div>
  )
}
