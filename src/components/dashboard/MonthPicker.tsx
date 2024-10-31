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
        size="fit"
        variant="plain"
        className="md:px-4"
        onClick={() => navigateMonth(-1)}
      >
        <IoIosArrowBack size={28} />
        <label className="hidden sm:block">
          Anterior
        </label>
      </Button>

      <h2 className="text-center">{getMonthLabel(monthDate)}</h2>

      <Button
        size="fit"
        variant="plain"
        className="md:px-4"
        onClick={() => navigateMonth(1)}
      >
        <label className="hidden sm:block">
          Próximo
        </label>
        <IoIosArrowForward size={28} />
      </Button>
    </div>
  )
}

export default MonthPicker