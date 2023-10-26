'use client'

import { useEffect, useState } from 'react'
import { type Audio } from '@/app/lib/types'
import { AudioPlayer } from './components'
import { getAudios } from './actions'

export default function Home() {
  const [audios, setAudios] = useState<Audio[]>([])
  const [playedAudio, setPlayedAudio] = useState<Audio>()

  useEffect(() => {
    async function fetchAudios() {
      setAudios(await getAudios())
    }
    fetchAudios()
  }, [])
  
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight">
        Music player
      </h2>

      {audios && (
        <ul className="list-disc list-inside">
          {audios.map(audio => (
            <li key={audio.id} className="ml-4 text-blue-800">
              <button onClick={() => setPlayedAudio(audio)}>
                {audio.title}
              </button>
            </li>
          ))}
        </ul>        
      )}

      {playedAudio && (
        <div className="bg-gray-100">
          <AudioPlayer audio={playedAudio} />
        </div>
      )}
    </div>
  )
}
