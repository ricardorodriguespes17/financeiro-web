import { create } from 'zustand'
import { BoardType } from '../@types/BoardType'

type State = {
  isLoading: boolean
  boards: BoardType[]
  currentBoard: BoardType | null
}

type Action = {
  addBoard: (data: BoardType) => void
  updateBoard: (data: BoardType) => void
  deleteBoard: (id: string) => void
  setBoards: (data: BoardType[]) => void
  setCurrentBoard: (data: BoardType | null) => void
  setIsLoading: (value: boolean) => void
}

const useBoardStore = create<State & Action>((set, get) => ({
  boards: [],
  currentBoard: null,
  isLoading: false,
  setIsLoading: (value) => set({isLoading: value}),
  setBoards: (data) => { set({ boards: data }) },
  setCurrentBoard: (data) => { set({ currentBoard: data }) },
  addBoard: (data) => {
    const boards = get().boards
    set(() => ({ boards: boards.concat(data) }))
  },
  updateBoard: (data) => {
    const boards = get().boards
    set(() => ({
      boards: boards.map(item => {
        if (item.id === data.id)
          return { ...item, ...data }

        return item
      })
    }))
  },
  deleteBoard: (id) => {
    const boards = get().boards
    set(() => ({ boards: boards.filter(item => item.id !== id) }))
  }
}))

export default useBoardStore