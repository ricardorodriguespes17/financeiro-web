import { create } from 'zustand'
import { NotificationType } from '../@types/NotificationType'

const notificationTime = 3000

type State = {
  notification: NotificationType | null,
  isShowing: boolean
}

type Action = {
  setNotification: (notification: NotificationType | null) => void
  clearNotification: () => void
}

const useNotificationStore = create<State & Action>((set, get) => ({
  notification: null,
  isShowing: false,
  setNotification: (notification) => {
    if (!get().isShowing) {
      set(() => ({ notification, isShowing: true }))
      setTimeout(get().clearNotification, notificationTime)
    }
  },
  clearNotification: () => set(() => ({ notification: null, isShowing: false }))
}))

export default useNotificationStore