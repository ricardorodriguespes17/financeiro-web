import Calendar from "../calendar/Calendar"
import BalancesBox from "./BalancesBox"
import useBoardMode from "../../store/boardModeStore"
import useBoardActions from "../../hooks/useBoardActions"
import { useEffect } from "react"
import useTransferenceActions from "../../hooks/useTransferenceActions"
import TransferenceTable from "./TransferenceTable"
import ModalTransference from "./ModalTransference"

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
      <ModalTransference />
      <BalancesBox />

      {mode === "calendar" && <Calendar />}
      {
        mode === "table" && (
          <>
            <TransferenceTable type="expense" />
            <TransferenceTable type="income" />
          </>
        )
      }
    </>
  )
}

export default BoardContainer