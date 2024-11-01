import Calendar from "../calendar/Calendar"
import BalancesBox from "./BalancesBox"
import useBoardMode from "../../store/boardModeStore"
import TransferenceTable from "./TransferenceTable"
import ModalTransference from "./ModalTransference"

const BoardContainer = () => {
  const { mode } = useBoardMode()

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