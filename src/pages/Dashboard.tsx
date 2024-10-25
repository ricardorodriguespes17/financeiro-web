import Header from "../components/ui/Header"
import SideBar from "../components/SideBar"
import BalancesBox from "../components/dashboard/BalancesBox"
import MonthPicker from "../components/dashboard/MonthPicker"
import useMonth from "../store/monthStore"
import useBoard from "../store/boardStore"
import { useEffect, useState } from "react"
import ModalTransference from "../components/dashboard/ModalTransference"
import useTransferenceModal from "../store/tranferenceModalStore"
import Button from "../components/ui/Button"
import { BiPlus } from "react-icons/bi"
import boardController from "../controller/boardController"
import Calendar from "../components/calendar/Calendar"
import ExpensesBox from "../components/dashboard/ExpensesBox"
import IncomesBox from "../components/dashboard/IncomesBox"
import ButtonChangeMode from "../components/dashboard/ButtonChangeMode"

const DashboardPage = () => {
  const { monthDate } = useMonth()
  const { loadBoard, boardId } = useBoard()
  const { currentTransference } = useTransferenceModal()
  const [mode, setMode] = useState<"calendar" | "table">("table")

  useEffect(() => {
    if (!currentTransference) {
      loadBoard(monthDate)
    }
  }, [loadBoard, monthDate, currentTransference])

  const handleCreateBoard = () => {
    boardController.createBoard({ id: monthDate })
    loadBoard(monthDate)
  }

  const toggleMode = () => {
    if (mode === "table") {
      setMode("calendar")
    } else {
      setMode("table")
    }
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
              <ButtonChangeMode
                mode={mode}
                toggleMode={toggleMode}
              />

              <BalancesBox />

              {mode === "calendar" && <Calendar />}
              {
                mode === "table" && (
                  <>
                    <ExpensesBox />
                    <IncomesBox />
                  </>
                )
              }
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