import { create } from 'zustand'
import { type Audio } from './types'

type Store = {
  audio: Audio | null
  play: (audio: Audio) => void
}

export const useAudioStore = create<Store>()((set) => ({
  audio: null,
  play: (audio) => set(state => ({ audio }))
}))
