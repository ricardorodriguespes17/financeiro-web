import Calendar from "../calendar/Calendar"
import BalancesBox from "./BalancesBox"
import ExpensesBox from "./ExpensesBox"
import IncomesBox from "./IncomesBox"
import useBoardMode from "../../store/boardModeStore"
import useBoardActions from "../../hooks/useBoardActions"
import { useEffect } from "react"
import useTransferenceActions from "../../hooks/useTransferenceActions"

const BoardContainer = () => {
  const { getIsLoading, getCurrentBoard } = useBoardActions()
  const { loadTransferences } = useTransferenceActions()
  const { mode } = useBoardMode()

  const currentBoard = getCurrentBoard()

  useEffect(() => {
    loadTransferences()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBoard])

  if (!currentBoard && !getIsLoading()) {
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