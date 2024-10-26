import { create } from 'zustand'
import { TransferenceType } from '../@types/TransferenceType'
import transferenceController from '../controller/transferenceController'
import boardController from '../controller/boardController'
import { BoardType } from '../@types/BoardType'

type State = {
  expenses: TransferenceType[]
  incomes: TransferenceType[]
  isLoading: boolean
  boards: BoardType[]
  currentBoard: BoardType | null
}

type Action = {
  loadTransferences: (boardId: string) => Promise<void>
  loadBoards: () => Promise<void>
}

const useBoard = create<State & Action>((set, get) => ({
  boards: [],
  currentBoard: null,
  incomes: [],
  expenses: [],
  isLoading: false,
  loadBoards: async () => {
    if(get().boards.length > 0) {
      return
    }

    try {
      set(() => ({ isLoading: true }))
      const response = await boardController.getBoards()
      set({ boards: response.data })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      set(() => ({ boards: [] }))
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