'use client'

import { useState, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { fetchAllTracks, type TrackWithRelatedData } from './actions'
import { useAudioPlayer } from '@/lib/store'
import { TrackCard } from './components'

export default function Page() {
  const [tracks, setTracks] = useState<TrackWithRelatedData[]>([])
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(5)
  const [hasMore, setHasMore] = useState(false)

  const { play } = useAudioPlayer(
    useShallow(state => ({ trackId: state.trackId, play: state.play }))
  )

  useEffect(() => {
    async function fetchData() {
      const { data } = await fetchAllTracks({ skip, take: take+1 })
      if (data) {
        setTracks(state => [...state, ...data.slice(0, take)])
        setHasMore(data.length > take)
      }
    }
    fetchData()
  }, [skip])

  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <ul className="grid grid-cols-5 gap-x-8 gap-y-10">
        {tracks.map(track => (
          <li key={track.id}>
            <TrackCard 
              track={track} 
              onPlay={() => play(track.id)}
            />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="mt-8 w-full flex justify-center">
          <button 
            className="py-2 px-4 rounded-md shadow-md bg-indigo-700 hover:bg-indigo-600 text-white text-sm font-bold"
            onClick={() => setSkip(skip+take)}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  )
}
