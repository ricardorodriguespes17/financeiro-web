import { useEffect } from "react"
import Notification from "./components/Notification"
import AppRoutes from "./routes"
import useTheme from "./store/themeStore"

function App() {
  const { themeMode } = useTheme()

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
