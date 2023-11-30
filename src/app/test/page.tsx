'use client'

import { useEffect, useState } from 'react'
import { type Audio } from '@/lib/types'
import { getAudios } from './actions'
import { useAudioStore } from '@/lib/store'

export default function Home() {
  const [audios, setAudios] = useState<Audio[]>([])
  const play = useAudioStore(state => state.play)

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
              <button onClick={() => play(audio)}>
                {audio.title}
              </button>
            </li>
          ))}
        </ul>        
      )}
    </div>
  )
}
