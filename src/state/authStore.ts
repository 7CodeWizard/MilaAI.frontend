import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import { AUTH_STORE } from '../utils/constant'
import { User } from '../services/interface'

interface AuthStoreInterface {
  isAADAuthenticated: boolean
  setAADAuthenticated: (isAADAuthenticated: boolean) => void

  isUserRegistered: boolean
  setUserRegistered: (isUserRegistered: boolean) => void

  user: User | null
  setUser: (user: User | null) => void

  // Onboarding
  nativeLanguage: string
  setNativeLanguage: (nativeLanguage: string) => void

  targetLanguage: string
  setTargetLanguage: (targetLanguage: string) => void

  age: string
  setAge: (age: string) => void

  name: string
  setName: (name: string) => void

  proficiency: string
  setProficiency: (proficiency: string) => void
}

const authStore = (set: any) => ({
  isUserRegistered: false,
  setUserRegistered: (isUserRegistered: boolean) => set({ isUserRegistered }),

  isAADAuthenticated: false,
  setAADAuthenticated: (isAADAuthenticated: boolean) => set({ isAADAuthenticated }),

  user: null,
  setUser: (user: User | null) => set({ user }),

  nativeLanguage: '',
  setNativeLanguage: (nativeLanguage: string) => set({ nativeLanguage }),

  targetLanguage: '',
  setTargetLanguage: (targetLanguage: string) => set({ targetLanguage }),

  age: '',
  setAge: (age: string) => set({ age }),

  name: '',
  setName: (name: string) => set({ name }),

  proficiency: '',
  setProficiency: (proficiency: string) => set({ proficiency })
})

const persistedAuthStore: any = persist(authStore, { name: AUTH_STORE })
export const useAuthStore = create<AuthStoreInterface>(persistedAuthStore)
