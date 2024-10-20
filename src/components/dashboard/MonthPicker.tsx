import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import Button from "../ui/Button"
import { changeMonthDate, getMonthLabel } from "../../utils/getCurrentDate"
import useMonth from "../../store/monthStore"

const MonthPicker = () => {
  const { monthDate, setMonthDate } = useMonth()

  const navigateMonth = (position: number) => {
    const newMonth = changeMonthDate(monthDate, position)

    setMonthDate(newMonth)
  }

  return (
    <div className="w-full flex items-center justify-between">
      <Button
        size="normal"
        variant="plain"
        onClick={() => navigateMonth(-1)}
      >
        <IoIosArrowBack size={28} />
      </Button>
      <h2>{getMonthLabel(monthDate)}</h2>
      <Button
        size="normal"
        variant="plain"
        onClick={() => navigateMonth(1)}
      >
        <IoIosArrowForward size={28} />
      </Button>
    </div>
  )
}

export default MonthPicker