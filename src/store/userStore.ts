import { create } from "zustand"
import { UserType } from "../@types/UserType"

type State = {
  user: UserType | null
}

type Actions = {
  setUser: (user: UserType | null) => void
}

const useUserStore = create<State & Actions>()(
  (set) => ({
    user: null,
    setUser: (user) => {
      set({ user })
    },
  }),
)

export default useUserStore