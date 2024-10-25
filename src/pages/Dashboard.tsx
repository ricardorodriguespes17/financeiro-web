import { useEffect } from "react"
import Header from "../components/ui/Header"
import SideBar from "../components/SideBar"
import MonthPicker from "../components/dashboard/MonthPicker"
import useMonth from "../store/monthStore"
import useBoard from "../store/boardStore"
import ModalTransference from "../components/dashboard/ModalTransference"
import BoardContainer from "../components/dashboard/BoardContainer"
import CreateBoardButton from "../components/dashboard/CreateBoardButton"

const DashboardPage = () => {
  const { monthDate } = useMonth()
  const { loadBoard } = useBoard()

  useEffect(() => {
    loadBoard(monthDate)
  }, [loadBoard, monthDate])

  return (
    <div className="flex h-full">
      <aside>
        <SideBar />
      </aside>

      <div className="flex flex-col flex-1 h-full">
        <Header showMenuButton />

        <main className="w-full h-full flex-col gap-8 flex p-8 shadow-inner overflow-auto">
          <MonthPicker />
          <BoardContainer />
          <CreateBoardButton />
        </main>
      </div>

      <ModalTransference />
    </div>
  )
}

export default DashboardPage