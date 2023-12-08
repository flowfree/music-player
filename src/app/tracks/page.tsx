'use client'

import { useState, useEffect } from 'react'
import { fetchAllTracks, type TrackWithRelatedData } from './actions'
import { PlayCircleIcon } from '@heroicons/react/24/solid'

export default function Page() {
  const [tracks, setTracks] = useState<TrackWithRelatedData[]>([])
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(15)
  const [hasMore, setHasMore] = useState(false)

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
    <div className="max-w-7xl mx-auto">
      <ul className="grid grid-cols-5 gap-x-8 gap-y-10">
        {tracks.map(track => (
          <li key={track.id} className="flex flex-col gap-2">
            <img src={track.imageUrl || ''} className="rounded-md" alt="" />
            <div>
              <h3 className="font-bold">
                {track.title}
              </h3>
              <p className="text-sm text-gray-500">
                {track.artists.map(artist => artist.name).join(', ')}
              </p>
              <div className="mt-2 flex gap-2 items-center">
                <p className="grow text-sm font-bold text-gray-800">
                  {track.genres.map(genre => genre.name).join(', ')}
                </p>
                <p>
                  <button className="py-1 px-2 flex gap-1 text-xs rounded-full border border-gray-600 hover:bg-indigo-700 hover:text-white font-bold">
                    <PlayCircleIcon className="w-4 h-4" />
                    Play
                  </button>
                </p>
              </div>
            </div>
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
