import { create } from 'zustand'

type State = {
  isOpened: boolean
}

type Action = {
  closeMenu: () => void
  openMenu: () => void
}

const useMenuStore = create<State & Action>((set) => ({
  isOpened: false,
  closeMenu: () => set(() => ({isOpened: false})),
  openMenu: () => set(() => ({isOpened: true})),
}))

export default useMenuStore