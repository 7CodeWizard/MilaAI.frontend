import { create } from 'zustand'
import { DailyStreak } from '../interfaces'

interface ProfileStoreInterface {
  dailyStreak: DailyStreak | null
  setDailyStreak: (streak: DailyStreak) => void
}

const profileStore = (set: any) => ({
  dailyStreak: null,
  setDailyStreak: (dailyStreak: DailyStreak) => set({ dailyStreak })
})

export const useProfileStore = create<ProfileStoreInterface>(profileStore)
