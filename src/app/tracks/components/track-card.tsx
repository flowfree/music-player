'use client'

import { type TrackWithRelatedData } from '../actions'

export function TrackCard({
  track
}: {
  track: TrackWithRelatedData
}) {
  return (
    <div className="flex flex-col gap-2">
      <img src={track.imageUrl || ''} className="rounded-md" alt="" />
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
            {/* <button 
              className="py-1 px-2 flex gap-1 text-xs rounded-full border border-gray-600 hover:bg-indigo-700 hover:text-white font-bold"
              onClick={() => play(track.id)}
            >
              <PlayCircleIcon className="w-4 h-4" />
              Play
            </button> */}
            2 days ago
          </p>
        </div>
      </div>
    </div>
  )
}
