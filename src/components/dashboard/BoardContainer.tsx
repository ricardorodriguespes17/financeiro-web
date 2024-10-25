import { useState } from "react"
import Calendar from "../calendar/Calendar"
import BalancesBox from "./BalancesBox"
import ButtonChangeMode from "./ButtonChangeMode"
import ExpensesBox from "./ExpensesBox"
import IncomesBox from "./IncomesBox"
import useBoard from "../../store/boardStore"

const BoardContainer = () => {
  const { boardId, isLoading } = useBoard()
  const [mode, setMode] = useState<"calendar" | "table">("table")

  const toggleMode = () => {
    if (mode === "table") {
      setMode("calendar")
    } else {
      setMode("table")
    }
  }

  if(!boardId && !isLoading) {
    return <></>
  }

  return (
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
  )
}

export default BoardContainer