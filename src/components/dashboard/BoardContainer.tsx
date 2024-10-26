import Calendar from "../calendar/Calendar"
import BalancesBox from "./BalancesBox"
import ExpensesBox from "./ExpensesBox"
import IncomesBox from "./IncomesBox"
import useBoardMode from "../../store/boardModeStore"
import useBoardActions from "../../hooks/useBoardActions"

const BoardContainer = () => {
  const { isLoading, getCurrentBoard } = useBoardActions()
  const { mode } = useBoardMode()

  const currentBoard = getCurrentBoard()

  if (!currentBoard && !isLoading) {
    return <></>
  }

  return (
    <>
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
  )
}

export default BoardContainer