import { create } from 'zustand'
import { TransferenceType } from '../@types/TransferenceType'

type State = {
  currentTransference: TransferenceType | null,
  isOpen: boolean
}

type Action = {
  setCurrentTransference: (data: TransferenceType | null) => void
  setIsOpen: (value: boolean) => void
}

const useTransferenceModal = create<State & Action>((set) => ({
  currentTransference: null,
  isOpen: false,
  setCurrentTransference: (data: TransferenceType | null) => set(() => ({
    currentTransference: data, isOpen: true
  })),
  setIsOpen: (value) => set(() => ({ isOpen: value }))
}))

export default useTransferenceModal