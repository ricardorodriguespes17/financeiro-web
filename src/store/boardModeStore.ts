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
      name: 'auth-storage',
    }
  )
)

export default useBoardMode