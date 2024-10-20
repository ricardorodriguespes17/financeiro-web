import Header from "../components/ui/Header"
import SideBar from "../components/SideBar"
import BalancesBox from "../components/dashboard/BalancesBox"
import ExpensesBox from "../components/dashboard/ExpensesBox"
import IncomesBox from "../components/dashboard/IncomesBox"

const DashboardPage = () => {
  return (
    <div className="flex h-full">
      <aside>
        <SideBar />
      </aside>

      <div className="flex flex-col flex-1 h-full">
        <Header showMenuButton />

        <main className="w-full h-full flex-col gap-8 flex p-8 shadow-inner overflow-auto">
          <BalancesBox />
          <ExpensesBox />
          <IncomesBox />
        </main>
      </div>
    </div>
  )
}

export default DashboardPage