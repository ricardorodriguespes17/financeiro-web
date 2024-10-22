import { create } from 'zustand'
import { NotificationType } from '../@types/NotificationType'

const notificationTime = 3000

type State = {
  notification: NotificationType | null,
}

type Action = {
  setNotification: (notification: NotificationType | null) => void
  clearNotification: () => void
}

const useNotificationStore = create<State & Action>((set, get) => ({
  notification: null,
  setNotification: (notification) => {
    set(() => ({ notification }))
    setTimeout(get().clearNotification, notificationTime)
  },
  clearNotification: () => get().setNotification(null)
}))

export default useNotificationStore