import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Section } from '../services/interface'

interface SectionsStoreInterface {
  currentSection: Section | null
  setCurrentSection: (currentSection: Section) => void

  sections: Section[]
  setSections: (sections: Section[]) => void

  messageCount: number
  setMessageCount: (messageCount: number) => void
}

const sectionsStore = (set: any) => ({
  currentSection: null,
  setCurrentSection: (currentSection: Section) => set({ currentSection }),

  sections: [],
  setSections: (sections: Section[]) => set({ sections }),

  messageCount: 0,
  setMessageCount: (messageCount: number) => set({ messageCount })
})

const persistedSectionsStore: any = persist(sectionsStore, { name: 'SECTIONS_STORE' })
export const useSectionsStore = create<SectionsStoreInterface>(persistedSectionsStore)
