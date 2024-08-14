import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChineseNotation, JapaneseNotation } from '../services/interface'
import { ThemeColor } from '../interfaces'

interface SettingStore {
  themeColor: ThemeColor
  setThemeColor: (themeColor: ThemeColor) => void

  showRomaji: boolean
  setRomajiShown: (showRomaji: boolean) => void

  japaneseNotation: JapaneseNotation
  setJapaneseNotation: (japaneseNotation: JapaneseNotation) => void

  chineseNotation: ChineseNotation
  setChineseNotation: (chineseNotation: ChineseNotation) => void

  autoSubmitThreadhold: number
  setAutoSubmitThreadhold: (autoSubmitThreadhold: number) => void

  autoRecord: boolean
  setAutoRecord: (autoRecord: boolean) => void

  audioOnly: boolean
  setAudioOnly: (audioOnly: boolean) => void

  colorMode: 'dark' | 'light'
  setColorMode: (colorMode: 'dark' | 'light') => void
}

const settingStore = (set: any) => ({
  themeColor: 'blue',
  setThemeColor: (themeColor: ThemeColor) => set({ themeColor }),

  showRomaji: true,
  setRomajiShown: (showRomaji: boolean) => set({ showRomaji }),

  japaneseNotation: 'Romaji',
  setJapaneseNotation: (japaneseNotation: JapaneseNotation) => set({ japaneseNotation }),

  chineseNotation: 'Romaji',
  setChineseNotation: (chineseNotation: ChineseNotation) => set({ chineseNotation }),

  autoSubmitThreadhold: 6,
  setAutoSubmitThreadhold: (autoSubmitThreadhold: number) => set({ autoSubmitThreadhold }),

  autoRecord: false,
  setAutoRecord: (autoRecord: boolean) => set({ autoRecord }),

  audioOnly: false,
  setAudioOnly: (audioOnly: boolean) => set({ audioOnly }),

  colorMode: 'light',
  setColorMode: (colorMode: 'light' | 'dark') => set({ colorMode })
})

const persistedSettingStore: any = persist(settingStore, { name: 'SETTING_STORE' })
export const useSettingStore = create<SettingStore>(persistedSettingStore)
