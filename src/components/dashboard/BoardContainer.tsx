import Calendar from "../calendar/Calendar"
import BalancesBox from "./BalancesBox"
import useBoardMode from "../../store/boardModeStore"
import TransferenceTable from "./TransferenceTable"
import ModalTransference from "./ModalTransference"
import useMonth from "../../store/monthStore"
import { useEffect } from "react"
import useTransferenceActions from "../../hooks/useTransferenceActions"
import CreditTable from "./CreditTable"

const BoardContainer = () => {
  const { mode } = useBoardMode()
  const { monthDate } = useMonth()
  const { loadTransferences } = useTransferenceActions()

  useEffect(() => {
    loadTransferences(monthDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthDate])

  return (
    <>
      <ModalTransference />
      <BalancesBox />

      {mode === "calendar" && <Calendar />}
      {
        mode === "table" && (
          <>
            <TransferenceTable type="expense" />
            <TransferenceTable type="income" />
            <CreditTable />
          </>
        )
      }
    </>
  )
}

export default BoardContainer