import { useEffect } from "react"
import Notification from "./components/Notification"
import AppRoutes from "./routes"
import useTheme from "./store/themeStore"
import ApiService from "./services/ApiService"
import useAuthStore from "./store/authStore"

function App() {
  const { themeMode } = useTheme()
  const { accessToken } = useAuthStore()

  useEffect(() => {
    ApiService.setAuthHeader(accessToken)
  }, [accessToken])

  useEffect(() => {
    const root = window.document.documentElement
    if (themeMode === "dark") root.classList.add("dark")
    else root.classList.remove("dark")
  }, [themeMode])

  return (
    <>
      <Notification />
      <AppRoutes />
    </>
  )
}

export default App
