import MonthPicker from "../components/dashboard/MonthPicker"
import BoardContainer from "../components/dashboard/BoardContainer"
import MainBase from "../components/layout/MainBase"

const DashboardPage = () => {
  return (
    <MainBase>
      <MonthPicker />
      <BoardContainer />
    </MainBase>
  )
}

export default DashboardPage