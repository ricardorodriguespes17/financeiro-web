import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  accessToken: string | null
  refreshToken: string | null
}

type Actions = {
  setTokens: (tokens: State) => void
  clearToken: () => void
}

const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (tokens) => {
        set(tokens)
      },
      clearToken: () => {
        set({ accessToken: null, refreshToken: null })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore