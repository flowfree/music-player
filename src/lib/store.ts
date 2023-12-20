import { create } from 'zustand'

interface AudioPlayerState {
  trackId: number | null
  isPlaying: boolean

  play: (trackId: number) => void
  setIsPlaying: (val: boolean) => void
}

export const useAudioPlayer = create<AudioPlayerState>()((set) => ({
  trackId: null,
  isPlaying: false,

  play: (trackId) => set(state => ({ trackId })),
  setIsPlaying: (val) => set(state => ({ isPlaying: val }))
}))
