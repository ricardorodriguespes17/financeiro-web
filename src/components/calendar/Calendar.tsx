import { useEffect, useState } from "react"
import CalendarRow from "./CalendarRow"
import useMonth from "../../store/monthStore"
import getDaysOfMonth from "../../utils/getDaysOfMonth"

const Calendar = () => {
  const { monthDate } = useMonth()
  const [week] = useState([
    "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
  ])
  const [monthDays, setMonthDays] = useState<number[]>([])

  useEffect(() => {
    const monthDays = getDaysOfMonth(monthDate)

    setMonthDays(monthDays || [])
  }, [monthDate])

  return (
    <div className="w-full">
      <header className="w-full flex bg-primary rounded-md">
        {week.map(item => (
          <div className="flex flex-1 justify-center items-center h-10">
            <label className="text-white font-bold">{item}</label>
          </div>
        ))}
      </header>

      <main className="flex flex-col">
        {new Array(6).fill(0).map((_item, index) => {
          const range = monthDays.slice(index * 7, index * 7 + 7)

          if(range.length > 0) {
            while(range.length < 7) {
              range.push(-1)
            }
          }

          return (
            <CalendarRow rangeDays={range} />
          )
        })}
      </main>
    </div>
  )
}

export default Calendar