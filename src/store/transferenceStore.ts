import { create } from 'zustand'
import { TransferenceType } from '../@types/TransferenceType'
import transferenceController from '../controller/transferenceController'

type State = {
  expenses: TransferenceType[]
  incomes: TransferenceType[]
  isLoading: boolean
}

type Action = {
  loadTransferences: (boardId: string) => Promise<void>
}

const useTransference = create<State & Action>((set) => ({
  incomes: [],
  expenses: [],
  isLoading: false,
  loadTransferences: async (boardId) => {
    try {
      set(() => ({ isLoading: true }))
      const { data: transferences } = await transferenceController.getTransferences(boardId)
      const expenses: TransferenceType[] = []
      const incomes: TransferenceType[] = []

      transferences
        .sort((a, b) => a.expireDay - b.expireDay)
        .map(item => {
          if (item.type === "expense") {
            expenses.push(item)
          } else {
            incomes.push(item)
          }
        })

      set(() => ({ expenses, incomes }))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      set(() => ({ expenses: [], incomes: [] }))
    } finally {
      set(() => ({ isLoading: false }))
    }
  }
}))

export default useTransference