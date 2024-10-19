import { useNavigate } from "react-router-dom"
import Button from "../components/ui/Button"
import Header from "../components/ui/Header"

const DashboardPage = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/login")
  }

  return (
    <div>
      <Header showMenuButton>
        <Button onClick={handleLogout}>
          Sair
        </Button>
      </Header>

      <main className="flex-1 flex flex-col items-center pt-8">

      </main>
    </div>
  )
}

export default DashboardPage