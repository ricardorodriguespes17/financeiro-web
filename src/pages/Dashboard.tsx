import { useEffect } from "react"
import MonthPicker from "../components/dashboard/MonthPicker"
import BoardContainer from "../components/dashboard/BoardContainer"
import CreateBoardButton from "../components/dashboard/CreateBoardButton"
import useBoardActions from "../hooks/useBoardActions"
import MainBase from "../components/layout/MainBase"

const DashboardPage = () => {
  const { loadBoards } = useBoardActions()

  useEffect(() => {
    loadBoards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MainBase>
      <MonthPicker />
      <BoardContainer />
      <CreateBoardButton />
    </MainBase>
  )
}

export default DashboardPage