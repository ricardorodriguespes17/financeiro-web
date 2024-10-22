import { create } from "zustand"
import { persist } from "zustand/middleware"
import ApiService from "../services/ApiService"

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
        ApiService.setAuthHaader(tokens.accessToken)
      },
      clearToken: () => {
        set({ accessToken: null, refreshToken: null })
        ApiService.setAuthHaader(null)
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore