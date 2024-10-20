import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import Button from "../ui/Button"
import { useState } from "react"
import { changeMonthDate, getMonthLabel } from "../../utils/getCurrentDate"

const MonthPicker = () => {
  const [month, setMonth] = useState("2024-11")

  const navigateMonth = (position: number) => {
    const newMonth = changeMonthDate(month, position)

    setMonth(newMonth)
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
      <h2>{getMonthLabel(month)}</h2>
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