import { create } from 'zustand'
import { TransferenceType } from '../@types/TransferenceType'

type State = {
  transferences: TransferenceType[]
  currentTransference: Partial<TransferenceType> | null
  isLoading: boolean
}

type Action = {
  setCurrentTransference: (data: Partial<TransferenceType> | null) => void
  setTransferences: (transferences: TransferenceType[]) => void
  addTransference: (data: TransferenceType) => void
  updateTransference: (data: TransferenceType) => void
  deleteTransference: (id: string) => void
  getIncomes: () => TransferenceType[]
  getExpenses: () => TransferenceType[]
  setLoading: (value: boolean) => void
}

const useTransferenceStore = create<State & Action>((set, get) => ({
  transferences: [],
  currentTransference: null,
  isLoading: false,
  setCurrentTransference: (data) => {
    set(() => ({ currentTransference: data }))
  },
  getIncomes: () => {
    const transferences = get().transferences
    return transferences
      .filter(item => item.type === "income")
      .sort((a, b) => a.expireDay - b.expireDay)
  },
  getExpenses: () => {
    const transferences = get().transferences
    return transferences
      .filter(item => item.type === "expense")
      .sort((a, b) => a.expireDay - b.expireDay)
  },
  setTransferences: (transferences: TransferenceType[]) => {
    set(() => ({ transferences }))
  },
  addTransference: (data: TransferenceType) => {
    const transferences = get().transferences
    set(() => ({ transferences: transferences.concat(data) }))
  },
  updateTransference: (data: TransferenceType) => {
    const transferences = get().transferences
    set(() => ({
      transferences: transferences.map(item => {
        if (item.id === data.id)
          return { ...item, ...data }

        return item
      })
    }))
  },
  deleteTransference: (id: string) => {
    const transferences = get().transferences
    set(() => ({
      transferences: transferences.filter(item => item.id !== id)
    }))
  },
  setLoading: (value) => set({ isLoading: value })
}))

export default useTransferenceStore