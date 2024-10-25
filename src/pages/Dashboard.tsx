import { useEffect, useRef } from "react"
import Header from "../components/ui/Header"
import SideBar from "../components/SideBar"
import MonthPicker from "../components/dashboard/MonthPicker"
import useMonth from "../store/monthStore"
import useBoard from "../store/boardStore"
import ModalTransference from "../components/dashboard/ModalTransference"
import BoardContainer from "../components/dashboard/BoardContainer"
import CreateBoardButton from "../components/dashboard/CreateBoardButton"
import useBoardMode from "../store/boardModeStore"

const DashboardPage = () => {
  const { monthDate } = useMonth()
  const { loadBoard } = useBoard()
  const { mode } = useBoardMode()
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadBoard(monthDate)
  }, [loadBoard, monthDate])

  useEffect(() => {
    if(mainRef.current) {
      mainRef.current.scrollTo({ top: 0 })
    }
  }, [mode])

  return (
    <div className="flex h-full">
      <aside>
        <SideBar />
      </aside>

      <div className="flex flex-col flex-1 h-full">
        <Header showMenuButton />

        <main ref={mainRef} className="w-full h-full flex-col gap-8 flex px-4 py-8 md:px-8 shadow-inner overflow-auto">
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