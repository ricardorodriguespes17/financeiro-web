import { create } from "zustand"
import { persist } from "zustand/middleware"

type ModeType = "calendar" | "table"

type State = {
  mode: ModeType
}

type Actions = {
  toggleMode: () => void
}

const useBoardMode = create<State & Actions>()(
  persist(
    (set, get) => ({
      mode: "table",
      toggleMode: () => {
        set({
          mode: get().mode === "calendar" ? "table" : "calendar"
        })
      },
    }),
    {
      name: 'board-mode-storage',
    }
  )
)

export default useBoardMode