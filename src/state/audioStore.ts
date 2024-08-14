import { create } from 'zustand'

interface AudioStoreInterface {
  audio: HTMLAudioElement | null
  setAudio: (audio: HTMLAudioElement | null) => void

  hasRecogError: boolean
  setHasRecogError: (hasRecogError: boolean) => void
}

const audioStore = (set: any) => ({
  audio: null,
  setAudio: (audio: HTMLAudioElement | null) => set({ audio }),

  hasRecogError: false,
  setHasRecogError: (hasRecogError: boolean) => set({ hasRecogError })
})

export const useAudioStore = create<AudioStoreInterface>(audioStore)
