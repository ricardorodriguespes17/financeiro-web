import { create } from 'zustand'
import { TransferenceType } from '../@types/TransferenceType'

type State = {
  currentTransference: Partial<TransferenceType> | null,
}

type Action = {
  setCurrentTransference: (data: Partial<TransferenceType> | null) => void
}

const useTransferenceModal = create<State & Action>((set) => ({
  currentTransference: null,
  setCurrentTransference: (data: Partial<TransferenceType> | null) => set(() => ({
    currentTransference: data
  })),
}))

export default useTransferenceModal