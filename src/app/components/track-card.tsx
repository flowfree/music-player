'use client'

import { useShallow } from 'zustand/react/shallow'
import { useAudioPlayer } from '@/lib/store'
import { TrackImage, SoundWaveAnimation } from '.'
import { type TrackWithRelatedData } from '../tracks/actions'
import { PlayCircleIcon } from '@heroicons/react/24/solid'

export function TrackCard({
  track,
  onPlay
}: {
  track: TrackWithRelatedData,
  onPlay: (trackId: number) => void
}) {
  const { trackId, isPlaying } = useAudioPlayer(
    useShallow(state => ({ 
      trackId: state.trackId, 
      isPlaying: state.isPlaying 
    }))
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <TrackImage src={track.imageUrl || ''} className="rounded-md" />
        <div className="group absolute top-0 left-0 z-10 w-full h-full flex items-center justify-center hover:bg-gray-50/20">
          {trackId === track.id && isPlaying && (
            <div className="p-1 absolute bottom-2 left-2 rounded-full bg-white shadow">
              <SoundWaveAnimation />
            </div>
          )}
          {trackId !== track.id && (
            <button 
              className="hidden py-1 px-2 group-hover:flex gap-1 text-sm rounded-full shadow bg-indigo-700 hover:bg-indigo-600 text-white font-bold"
              onClick={() => onPlay(track.id)}
            >
              <PlayCircleIcon className="w-4 h-4" />
              Play
            </button>
          )}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-sm">
          {track.title}
        </h3>
        <p className="text-sm text-gray-500">
          {track.artists.map(artist => artist.name).join(', ')}
        </p>
        <div className="mt-2 flex gap-2 items-center">
          <p className="grow text-sm font-bold text-gray-800">
            {track.genres.map(genre => genre.name).join(', ')}
          </p>
          <p className="text-sm text-gray-400">
            {track.releaseDate && formatDateToText(track.releaseDate)}
          </p>
        </div>
      </div>
    </div>
  )
}

function formatDateToText(date: Date): string {
  const now = new Date()
  const diff = Math.abs(now.getTime() - date.getTime())
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  
  if (seconds < 60) {
    return `${seconds}s ago`
  } else if (minutes < 60) {
    return `${minutes}m ago`
  } else if (hours < 24) {
    return `${hours}h ago`
  } else if (days < 7) {
    return `${days}d ago`
  } else {
    return `${weeks}w ago`
  }
}
