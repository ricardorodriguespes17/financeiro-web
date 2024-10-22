import { create } from 'zustand'
import { TransferenceType } from '../@types/TransferenceType'

type State = {
  currentTransference: TransferenceType | null,
  isShowing: boolean
}

type Action = {
  setCurrentTransference: (data: TransferenceType) => void
  toggleShowing: () => void
}

const useTransferenceModal = create<State & Action>((set, get) => ({
  currentTransference: null,
  isShowing: false,
  setCurrentTransference: (data: TransferenceType) => set(() => ({
    currentTransference: data, isShowing: true
  })),
  toggleShowing: () => set(() => ({ isShowing: !get().isShowing }))
}))

export default useTransferenceModal