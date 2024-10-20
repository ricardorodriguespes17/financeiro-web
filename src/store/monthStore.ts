import { create } from 'zustand'
import { getCurrentMonthDate } from '../utils/getCurrentDate'

type State = {
  monthDate: string
}

type Action = {
  setMonthDate: (newMonthDate: string) => void
}

const useMonth = create<State & Action>((set) => ({
  monthDate: getCurrentMonthDate(),
  setMonthDate: (newMonthDate: string) => set(() => ({ monthDate: newMonthDate }))
}))

export default useMonth