import { create } from 'zustand'
import { TransferenceType } from '../@types/TransferenceType'
import transferenceController from '../controller/transferenceController'

type State = {
  initialValue: number
  expenses: TransferenceType[]
  incomes: TransferenceType[]
}

type Action = {
  loadTransferences: (boardId: string) => Promise<void>
}

const useBoard = create<State & Action>((set) => ({
  initialValue: 0,
  incomes: [],
  expenses: [],
  loadTransferences: async (boardId) => {
    try {
      const { data: transferences } = await transferenceController.getTransferences(boardId)
      const expenses: TransferenceType[] = []
      const incomes: TransferenceType[] = []

      transferences.map(item => {
        if(item.type === "expense") {
          expenses.push(item)
        } else {
          incomes.push(item)
        }
      })

      set(() => ({ expenses, incomes }))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch(err) {
      set(() => ({ expenses: [], incomes: [] }))
    }
  }
}))

export default useBoard