'use server'

import { Audio } from '@/lib/types'

const audioFiles: Audio[] = [{
  id: 1,
  title: 'Dreamer',
  artist: 'Alan Walker',
  duration: 155
}, {
  id: 2,
  title: 'Superhero in my sleep',
  artist: 'Rival, Asketa & Natan Chaim',
  duration: 186
}, {
  id: 4,
  title: 'Wake me up',
  artist: 'Nightcore Lab NCL',
  duration: 173
}]

export async function getAudios() {
  return audioFiles
}
