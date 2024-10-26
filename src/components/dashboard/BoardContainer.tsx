import Calendar from "../calendar/Calendar"
import BalancesBox from "./BalancesBox"
import ExpensesBox from "./ExpensesBox"
import IncomesBox from "./IncomesBox"
import useBoard from "../../store/boardStore"
import useBoardMode from "../../store/boardModeStore"

const BoardContainer = () => {
  const { isLoading, currentBoard } = useBoard()
  const { mode } = useBoardMode()

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