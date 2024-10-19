import Header from "../components/ui/Header"
import SideBar from "../components/SideBar"

const DashboardPage = () => {
  return (
    <div className="flex">
      <aside>
        <SideBar />
      </aside>

      <Header showMenuButton />

      <main className="flex-1 flex items-center pt-8">
      </main>
    </div>
  )
}

export default DashboardPage