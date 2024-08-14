import { create } from 'zustand'
import { ChatThreadArr, Hint } from '../services/interface'

interface ThreadStoreInterface {
  chatThreads: ChatThreadArr | []
  setChatThreads: (chatThreads: ChatThreadArr) => void

  hint: Hint | null
  setHint: (hint: Hint | null) => void

  isAudioProcessing: boolean
  setIsAudioProcessing: (isAudioProcessing: boolean) => void

  isAIThinking: boolean
  setAIThinking: (isAIThinking: boolean) => void

  isDailyLimitReached: boolean
  setDailyLimitReached: (isDailyLimitReached: boolean) => void
}

const threadStore = (set: any) => ({
  chatThreads: [],
  setChatThreads: (chatThreads: ChatThreadArr) => set({ chatThreads }),

  hint: null,
  setHint: (hint: Hint | null) => set({ hint }),

  isAudioProcessing: false,
  setIsAudioProcessing: (isAudioProcessing: boolean) => set({ isAudioProcessing }),

  isAIThinking: false,
  setAIThinking: (isAIThinking: boolean) => set({ isAIThinking }),

  isDailyLimitReached: false,
  setDailyLimitReached: (isDailyLimitReached: boolean) => set({ isDailyLimitReached })
})

export const useThreadStore = create<ThreadStoreInterface>(threadStore)
