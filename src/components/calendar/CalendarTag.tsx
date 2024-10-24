import { twMerge } from "tailwind-merge"
import { TransferenceType } from "../../@types/TransferenceType"
import useTransferenceModal from "../../store/tranferenceModalStore"
import { useState } from "react"

type CalendarTagProps = {
  data: TransferenceType
}

const CalendarTag = ({ data }: CalendarTagProps) => {
  const { setCurrentTransference } = useTransferenceModal()
  const [isDragging, setIsDragging] = useState(false) 

  const typesClassName = {
    expense: "bg-danger/15 text-danger",
    income: "bg-primary/20 text-primary-700"
  }

  const className = twMerge(
    "w-full flex itens-center rounded-md px-1 py-[1px] cursor-pointer",
    "hover:opacity-80 transition-all shadow overflow-hidden",
    typesClassName[data.type],
    isDragging ? "invisible" : "visible",
  )

  const handleOpen = () => {
    setCurrentTransference(data)
  }

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("application/json", JSON.stringify(data))
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <div
      className={className}
      draggable
      onClick={handleOpen}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <label className="text-xs md:text-sm lg:text-base">{data.name}</label>
    </div>
  )
}

export default CalendarTag