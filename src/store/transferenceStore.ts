import { create } from 'zustand'
import { TransferenceType } from '../@types/TransferenceType'

type State = {
  transferences: TransferenceType[]
  isLoading: boolean
}

type Action = {
  setTransferences: (transferences: TransferenceType[]) => void
  addTransference: (data: TransferenceType) => void
  updateTransference: (data: TransferenceType) => void
  deleteTransference: (id: string) => void
  getIncomes: () => TransferenceType[]
  getExpenses: () => TransferenceType[]
}

const useTransferenceStore = create<State & Action>((set, get) => ({
  transferences: [],
  isLoading: false,
  getIncomes: () => {
    const transferences = get().transferences
    return transferences.filter(item => item.type === "income")
  },
  getExpenses: () => {
    const transferences = get().transferences
    return transferences.filter(item => item.type === "expense")
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
  }
}))

export default useTransferenceStore