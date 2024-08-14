import { create } from 'zustand'
import { AskMode, ChatThreadArr, StudyMode, Feedback, Hint } from '../services/interface'
import { persist } from 'zustand/middleware'

interface ChatStoreInterface {
  isChatLoading: boolean
  setChatLoading: (isChatLoading: boolean) => void

  isRecording: boolean
  setRecording: (isRecording: boolean) => void

  feedback: Feedback | null
  setFeedback: (feedback: Feedback | null) => void

  hintApplied: boolean
  setHintApplied: (hintApplied: boolean) => void

  askMode: AskMode
  setAskMode: (askMode: AskMode) => void

  retry: boolean
  setRetry: (retry: boolean) => void

  studyMode: StudyMode
  setStudyMode: (studyMode: StudyMode) => void

  isStarted: boolean
  setStarted: (isStarted: boolean) => void

  isConversationEnded: boolean
  setConversationEnded: (isConversationEnded: boolean) => void

  isConversationEnding: boolean
  setConversationEnding: (isConversationEnding: boolean) => void

  firstMessage: string
  setFirstMessage: (firstMessage: string) => void
}

const chatStore = (set: any) => ({
  studyMode: StudyMode.CONVERSATION_EASY,
  setStudyMode: (studyMode: StudyMode) => set({ studyMode }),

  isRecording: false,
  setRecording: (isRecording: boolean) => set({ isRecording }),

  isChatLoading: false,
  setChatLoading: (isChatLoading: boolean) => set({ isChatLoading }),

  feedback: null,
  setFeedback: (feedback: Feedback | null) => set({ feedback }),

  askMode: AskMode.Audio,
  setAskMode: (askMode: AskMode) => set({ askMode }),

  retry: false,
  setRetry: (retry: boolean) => set({ retry }),

  hintApplied: false,
  setHintApplied: (hintApplied: false) => set({ hintApplied }),

  isStarted: false,
  setStarted: (isStarted: boolean) => set({ isStarted }),

  isFinished: false,
  setFinished: (isFinished: boolean) => set({ isFinished }),

  isConversationEnded: false,
  setConversationEnded: (isConversationEnded: boolean) => set({ isConversationEnded }),

  isConversationEnding: false,
  setConversationEnding: (isConversationEnding: boolean) => set({ isConversationEnding }),

  firstMessage: '',
  setFirstMessage: (firstMessage: string) => set({ firstMessage })
})

export const persistedSectionsStore: any = persist(chatStore, { name: 'CHAT_STORE' })
export const useChatStore = create<ChatStoreInterface>(persistedSectionsStore)
