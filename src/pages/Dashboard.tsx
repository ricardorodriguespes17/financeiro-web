import Header from "../components/ui/Header"
import SideBar from "../components/SideBar"
import BalancesBox from "../components/dashboard/BalancesBox"
import ExpensesBox from "../components/dashboard/ExpensesBox"
import IncomesBox from "../components/dashboard/IncomesBox"
import MonthPicker from "../components/dashboard/MonthPicker"
import useMonth from "../store/monthStore"
import useBoard from "../store/boardStore"
import { useEffect } from "react"
import ModalTransference from "../components/dashboard/ModalTransference"

const DashboardPage = () => {
  const { monthDate } = useMonth()
  const { loadTransferences } = useBoard()

  useEffect(() => {
    loadTransferences(monthDate)
  }, [loadTransferences, monthDate])

  return (
    <div className="flex h-full">
      <aside>
        <SideBar />
      </aside>

      <div className="flex flex-col flex-1 h-full">
        <Header showMenuButton />

        <main className="w-full h-full flex-col gap-8 flex p-8 shadow-inner overflow-auto">
          <MonthPicker />
          <BalancesBox />
          <ExpensesBox />
          <IncomesBox />
        </main>
      </div>
      
      <ModalTransference />
    </div>
  )
}

export default DashboardPage