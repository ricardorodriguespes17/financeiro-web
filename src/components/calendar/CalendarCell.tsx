import { useEffect, useState } from "react"
import { TransferenceCreateType, TransferenceType } from "../../@types/TransferenceType"
import { twMerge } from "tailwind-merge"
import CalendarTag from "./CalendarTag"
import transferenceController from "../../controller/transferenceController"
import useMonth from "../../store/monthStore"
import useTransference from "../../store/transferenceStore"

type CalendarCellProps = {
  day: number
}

const CalendarCell = ({ day }: CalendarCellProps) => {
  const { monthDate } = useMonth()
  const { expenses, incomes, loadTransferences } = useTransference()
  const [transferences, setTranfereces] = useState<TransferenceType[]>([])
  const enableDragDrop = day > 0

  const className = twMerge(
    "flex flex-col items-end flex-1 min-h-24 border border-gray-200 dark:border-gray-800",
    "overflow-hidden p-1 gap-1",
    day < 1 && "bg-gray-200 dark:bg-gray-800  *:hidden"
  )

  useEffect(() => {
    setTranfereces([
      ...expenses.filter(item => item.expireDay === day),
      ...incomes.filter(item => item.expireDay === day)
    ])
  }, [day, expenses, incomes])

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    const droppedData = event.dataTransfer.getData("application/json")
    const data = JSON.parse(droppedData) as TransferenceType

    if(data.expireDay !== day) {
      const updateData: TransferenceCreateType = {
        boardId: data.boardId,
        expireDay: day,
        name: data.name,
        type: data.type,
        value: data.value,
        description: data.description
      }
  
      await transferenceController.updateTransference(data.id, updateData)
      await loadTransferences(monthDate)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <div
      className={className}
      onDrop={enableDragDrop ? handleDrop : undefined}
      onDragOver={enableDragDrop ? handleDragOver : undefined}
    >
      <label className="mb-1">{day}</label>

      {transferences.map(item => (
        <CalendarTag key={item.id} data={item} />
      ))}
    </div>
  )
}

export default CalendarCell