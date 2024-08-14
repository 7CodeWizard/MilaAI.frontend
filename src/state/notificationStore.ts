import { create } from 'zustand'
import { Notification } from '../services/interface'

interface NotificationStoreInterface {
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
}

const notificationStore = (set: any) => ({
  notifications: [],
  setNotifications: (notifications: Notification[]) => set({ notifications })
})

export const useNotificationsStore = create<NotificationStoreInterface>(notificationStore)
