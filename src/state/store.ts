import { create } from 'zustand'

interface GlobalStoreInterface {
  width: number
  setWidth: (width: number) => void

  height: number
  setHeight: (height: number) => void

  recordingPermission: boolean
  setRecordingPermission: (recordingPermission: boolean) => void

  streamData: object
  setStreamData: (streamData: object) => void

  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void

  isIPad: boolean
  setIsIPad: (isIPad: boolean) => void

  ipAddress: string
  setIpAddress: (ipAddress: string) => void

  country: string
  setCountry: (country: string) => void
}

interface SignupStoreInterface {
  currentPage: number
  setCurrentPage: (currentPage: number) => void
}

const globalStore = (set: any) => ({
  width: window.innerWidth,
  setWidth: (width: number) => set({ width }),

  height: window.innerHeight,
  setHeight: (height: number) => set({ height }),

  recordingPermission: false,
  setRecordingPermission: (recordingPermission: boolean) => set({ recordingPermission }),

  streamData: {},
  setStreamData: (streamData: object) => set({ streamData }),

  isMobile: false,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),

  isIPad: false,
  setIsIPad: (isIPad: boolean) => set({ isIPad }),

  ipAddress: '',
  setIpAddress: (ipAddress: string) => set({ ipAddress }),

  country: '',
  setCountry: (country: string) => set({ country })
})

const signupStore = (set: any) => ({
  currentPage: 1,
  setCurrentPage: (currentPage: number) => set({ currentPage })
})

export const useGlobalStore = create<GlobalStoreInterface>(globalStore)
export const useSignupStore = create<SignupStoreInterface>(signupStore)
