'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/solid'

export function AudioPlayer({ 
  src 
}: {
  src: string
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.9)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = volume
    }
  }, [volume])

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
    <>
      <div className="p-4 flex flex-row gap-8 items-center border-t border-t-gray-200">

        <div className="basis-1/4 flex flex-row gap-2 overfow-hidden">
          <img src="/img/artwork.jpg" className="w-16 h-16" alt="" />
          <div className="self-center">
            <h3 className="text-sm font-bold line-clamp-1">
              Dreamer (Alex Skrindo Remix) aaa bbb ccc
            </h3>
            <p className="text-sm line-clamp-1">
              Alex Skrindo, Alan Walker
            </p>
          </div>
        </div>

        <div className="basis-1/2 flex flex-col gap-2 items-center">
          <div className="flex flex-row gap-4">
            <button className="hover:text-gray-600">
              <BackwardIcon className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded-full bg-purple-700 text-white"
              onClick={togglePlayPause}
            >
              {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
            </button>
            <button className="hover:text-gray-600">
              <ForwardIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full flex flex-row gap-2 items-center">
            <span className="text-xs">
              1:31
            </span>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-stone-700 h-1 rounded-full" style={{width: `${progress}%`}} />
            </div>
            <span className="text-xs">
              2:25
            </span>
          </div>
        </div>

        <div className="basis-1/4 flex flex-row-reverse">
          <div className="group w-[150px] flex flex-row gap-2 items-center">
            <SpeakerWaveIcon className="w-5 h-5 group-hover:text-purple-700" />
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              className="w-full h-1 bg-gray-200 rounded-lg cursor-pointer accent-stone-700 group-hover:accent-purple-700" 
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={src} onTimeUpdate={updateProgress} preload="none" />
    </>
  )
}
