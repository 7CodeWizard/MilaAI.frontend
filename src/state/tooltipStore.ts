import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TOOLTIP = '' | 'THREAD_CONTROLS' | 'RECORD' | 'USER_THREAD'

interface TooltipStoreInterface {
  tooltip: TOOLTIP
  setTooltip: (tooltip: TOOLTIP) => void

  textModeTried: boolean
  setTextModeTried: (textModeTried: boolean) => void

  audioModeTried: boolean
  setAudioModeTried: (audioModeTried: boolean) => void

  controlsTried: boolean
  setControlsTried: (controlsTried: boolean) => void

  showTour: boolean
  setShowTour: (showTour: boolean) => void
}

const tooltipStore = (set: any) => ({
  tooltip: '' as TOOLTIP,
  setTooltip: (tooltip: TOOLTIP) => set({ tooltip }),

  textModeTried: false,
  setTextModeTried: (textModeTried: boolean) => set({ textModeTried }),

  audioModeTried: false,
  setAudioModeTried: (audioModeTried: boolean) => set({ audioModeTried }),

  controlsTried: false,
  setControlsTried: (controlsTried: boolean) => set({ controlsTried }),

  showTour: true,
  setShowTour: (showTour: boolean) => set({ showTour })
})

const persistedTooltipStore: any = persist(tooltipStore, { name: 'TOOLTIP_STORE' })
export const useTooltipStore = create<TooltipStoreInterface>(persistedTooltipStore)
