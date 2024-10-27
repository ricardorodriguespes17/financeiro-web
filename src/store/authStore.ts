import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  accessToken: string | null
  refreshToken: string | null
}

type Actions = {
  setTokens: (tokens: State) => void
}

const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (tokens) => {
        set(tokens)
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore