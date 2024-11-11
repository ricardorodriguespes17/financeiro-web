import { TransferenceCreateType, TransferenceType } from "../../@types/TransferenceType"
import { twMerge } from "tailwind-merge"
import CalendarTag from "./CalendarTag"
import useTransferenceActions from "../../hooks/useTransferenceActions"

type CalendarCellProps = {
  day: number
}

const CalendarCell = ({ day }: CalendarCellProps) => {
  const {
    updateTransference,
    transferences,
    setCurrentTransference,
  } = useTransferenceActions()
  const enableDragDrop = day > 0
  const daysTransferences = transferences
    .filter(item => item.expireDay === day && item.type !== "initial")

  const className = twMerge(
    "flex flex-col items-end flex-1 min-h-24 border border-gray-200 dark:border-gray-800",
    "overflow-hidden p-1 gap-1 cursor-pointer",
    day < 1 && "bg-gray-200 dark:bg-gray-800 cursor-auto  *:hidden"
  )

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    const droppedData = event.dataTransfer.getData("application/json")
    const data = JSON.parse(droppedData) as TransferenceType

    if (data.expireDay !== day) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, installments, ...rest } = data

      const updateData: TransferenceCreateType = {
        ...rest,
        expireDay: day,
      }

      await updateTransference(id, updateData)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleClick = () => {
    if (day > 0) {
      setCurrentTransference({ expireDay: day })
    }
  }

  return (
    <div
      className={className}
      onDrop={enableDragDrop ? handleDrop : undefined}
      onDragOver={enableDragDrop ? handleDragOver : undefined}
      onClick={handleClick}
    >
      <label className="mb-1">{day}</label>

      {daysTransferences.map(item => (
        <CalendarTag key={item.id} data={item} />
      ))}
    </div>
  )
}

export default CalendarCell