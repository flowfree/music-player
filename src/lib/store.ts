import { create } from 'zustand'

interface AudioPlayerState {
  trackId: number | null
  play: (trackId: number) => void
}

export const useAudioPlayer = create<AudioPlayerState>()((set) => ({
  trackId: null,
  play: (trackId) => set(state => ({ trackId }))
}))
