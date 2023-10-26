'use server'

import { Audio } from '@/app/lib/types'

const audioFiles: Audio[] = [{
  id: 1,
  title: 'Dreamer',
  artist: 'Alan Walker'
}, {
  id: 2,
  title: 'Superhero in my sleep',
  artist: 'Rival, Asketa & Natan Chaim'
}, {
  id: 4,
  title: 'Wake me up',
  artist: 'Nightcore Lab NCL'
}]

export async function getAudios() {
  return audioFiles
}
