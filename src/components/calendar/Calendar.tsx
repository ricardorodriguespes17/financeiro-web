import { useEffect, useState } from "react"
import CalendarRow from "./CalendarRow"
import useMonth from "../../store/monthStore"
import getDaysOfMonth from "../../utils/getDaysOfMonth"
import { useMediaQuery } from "react-responsive"
import useBoard from "../../store/boardStore"
import Skeleton from "../Skeleton"
import ButtonChangeMode from "../dashboard/ButtonChangeMode"

const Calendar = () => {
  const { isLoading } = useBoard()
  const { monthDate } = useMonth()
  const [monthDays, setMonthDays] = useState<number[]>([])
  const [week, setWeek] = useState<string[]>([])
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
  })

  useEffect(() => {
    const monthDays = getDaysOfMonth(monthDate)
    setMonthDays(monthDays || [])
  }, [monthDate])

  useEffect(() => {
    if (isDesktopOrLaptop) {
      setWeek([
        "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
      ])
    } else {
      setWeek([
        "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"
      ])
    }
  }, [isDesktopOrLaptop])

  if (isLoading) {
    return (
      <div className="w-full flex flex-col">
        <Skeleton className="w-[200px] h-10 mb-2" />
        <Skeleton className="w-full h-10 bg-primary-300" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2>Calendário</h2>
        <ButtonChangeMode />
      </div>

      <header className="w-full flex bg-primary rounded-md">
        {week.map(item => (
          <div key={item} className="flex flex-1 justify-center items-center h-10">
            <label className="text-white font-bold">{item}</label>
          </div>
        ))}
      </header>

      <main className="flex flex-col">
        {new Array(6).fill(0).map((_item, index) => {
          const range = monthDays.slice(index * 7, index * 7 + 7)

          if (range.length > 0) {
            while (range.length < 7) {
              range.push(-1)
            }
          }

          return (
            <CalendarRow key={index} rangeDays={range} />
          )
        })}
      </main>
    </div>
  )
}

export default Calendar