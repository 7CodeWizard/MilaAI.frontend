import { create } from 'zustand'

interface StripeStoreInterface {
  clientSecret: string
  setClientSecret: (clientSecret: string) => void
}

const stripeStore = (set: any) => ({
  clientSecret: '',
  setClientSecret: (clientSecret: string) => set({ clientSecret })
})

export const useStripeStore = create<StripeStoreInterface>(stripeStore)
