import Calendar from "../calendar/Calendar"
import BalancesBox from "./BalancesBox"
import ExpensesBox from "./ExpensesBox"
import IncomesBox from "./IncomesBox"
import useBoard from "../../store/boardStore"
import useBoardMode from "../../store/boardModeStore"

const BoardContainer = () => {
  const { boardId, isLoading } = useBoard()
  const { mode } = useBoardMode()

  if (!boardId && !isLoading) {
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