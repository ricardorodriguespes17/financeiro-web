import { create } from 'zustand'
import boardController from '../controller/boardController'
import { BoardType } from '../@types/BoardType'

type State = {
  isLoading: boolean
  boards: BoardType[]
  currentBoard: BoardType | null
}

type Action = {
  loadBoards: () => Promise<void>
}

const useBoard = create<State & Action>((set, get) => ({
  boards: [],
  currentBoard: null,
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
}))

export default useBoard