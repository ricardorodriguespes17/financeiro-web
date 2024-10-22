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
import useTransferenceModal from "../store/tranferenceModalStore"
import Button from "../components/ui/Button"
import { BiPlus } from "react-icons/bi"
import boardController from "../controller/boardController"

const DashboardPage = () => {
  const { monthDate } = useMonth()
  const { loadBoard, boardId } = useBoard()
  const { isOpen } = useTransferenceModal()

  useEffect(() => {
    if (!isOpen) {
      loadBoard(monthDate)
    }
  }, [loadBoard, monthDate, isOpen])

  const handleCreateBoard = () => {
    boardController.createBoard({ id: monthDate })
    loadBoard(monthDate)
  }

  return (
    <div className="flex h-full">
      <aside>
        <SideBar />
      </aside>

      <div className="flex flex-col flex-1 h-full">
        <Header showMenuButton />

        <main className="w-full h-full flex-col gap-8 flex p-8 shadow-inner overflow-auto">
          <MonthPicker />
          {boardId ? (
            <>
              <BalancesBox />
              <ExpensesBox />
              <IncomesBox />
            </>
          ) : (
            <div className="flex flex-col gap-2 w-full items-center grow justify-center">
              <Button
                size="fit"
                className="aspect-square text-2xl"
                onClick={handleCreateBoard}
              >
                <BiPlus />
              </Button>
              <h3>Criar novo quadro</h3>
            </div>
          )}
        </main>
      </div>

      <ModalTransference />
    </div>
  )
}

export default DashboardPage