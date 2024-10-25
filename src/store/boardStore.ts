import { create } from 'zustand'
import { TransferenceType } from '../@types/TransferenceType'
import transferenceController from '../controller/transferenceController'
import boardController from '../controller/boardController'

type State = {
  boardId: string | null
  initialValue: number | null
  expenses: TransferenceType[]
  incomes: TransferenceType[]
  isLoading: boolean
}

type Action = {
  loadTransferences: (boardId: string) => Promise<void>
  loadBoard: (boardId: string) => Promise<void>
}

const useBoard = create<State & Action>((set, get) => ({
  boardId: null,
  initialValue: null,
  incomes: [],
  expenses: [],
  isLoading: false,
  loadBoard: async (boardId) => {
    try {
      set(() => ({ isLoading: true }))
      const response = await boardController.getBoardById(boardId)
      await get().loadTransferences(boardId)
      set(() => ({ boardId, initialValue: response.data?.initialValue }))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      set(() => ({ boardId: null, initialValue: null }))
    } finally {
      set(() => ({ isLoading: false }))
    }
  },
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
      set(() => ({ expenses: [], incomes: [], boardId }))
    } finally {
      set(() => ({ isLoading: false }))
    }
  }
}))

export default useBoard