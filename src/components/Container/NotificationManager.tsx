import { FC, ReactNode } from 'react'
import { MdClose } from 'react-icons/md'
import { Notification as NotificationProps } from '../../services/interface'
import { useNotificationsStore } from '../../state/notificationStore'
import { useNotifications } from '../../hooks/useNotifications'
import { Mailbox } from '../Icons'

interface NotificationManagerInterface {
  children: ReactNode
}

const Notification: FC<NotificationProps> = ({
  id,
  title,
  message,
  okText,
  cancelText,
  onCallback
}) => {
  const { deleteNotification } = useNotifications()

  return (
    <div className="bg-white rounded-lg p-4 m-4 max-w-[350px] border border-gray-200 animate-fade-up z-[10000]">
      <div className="flex mb-3 justify-between">
        <Mailbox />
        <button
          onClick={() => {
            deleteNotification(id)
          }}>
          <MdClose />
        </button>
      </div>
      <h3 className="text-sm font-semibold text-orange-600">{title}</h3>
      <h3 className="text-sm text-slate-600 mt-1">{message}</h3>
      <div className="mt-4 flex gap-3">
        {cancelText && (
          <button
            className="text-sm font-semibold text-gray-700"
            onClick={() => {
              deleteNotification(id)
            }}>
            {cancelText}
          </button>
        )}
        {okText && (
          <button
            className="text-sm font-semibold text-orange-700"
            onClick={() => {
              onCallback()
            }}>
            {okText}
          </button>
        )}
      </div>
    </div>
  )
}

const NotificationManager: FC<NotificationManagerInterface> = ({ children }) => {
  const [notifications] = useNotificationsStore((state) => [state.notifications])

  return (
    <>
      {children}
      <div className="fixed right-0 z-[100000] top-0">
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </div>
    </>
  )
}

export default NotificationManager
