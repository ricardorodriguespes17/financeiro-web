import { create } from "zustand"
import { persist } from "zustand/middleware"
import authController from "../controller/authController"

type State = {
  accessToken: string | null
  refreshToken: string | null
}

type Actions = {
  setTokens: (tokens: State) => void
  onLogout: () => Promise<void>
}

const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      onLogout: async () => {
        await authController.logout()
        set({ accessToken: null, refreshToken: null })
      },
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