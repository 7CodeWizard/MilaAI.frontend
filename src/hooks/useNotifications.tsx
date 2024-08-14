import { useNotificationsStore } from '../state/notificationStore'
import { Notification } from '../services/interface'

const generateUUID = () => Math.random().toString().slice(-6)

export const useNotifications = () => {
  let [notifications, setNotifications] = useNotificationsStore((state) => [
    state.notifications,
    state.setNotifications
  ])

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const uuid = generateUUID()

    setNotifications([
      ...notifications,
      {
        id: uuid,
        ...notification
      }
    ])
  }

  return {
    addNotification,
    deleteNotification
  }
}
