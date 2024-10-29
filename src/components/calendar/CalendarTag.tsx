import { twMerge } from "tailwind-merge"
import { TransferenceType } from "../../@types/TransferenceType"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import useTransferenceActions from "../../hooks/useTransferenceActions"

type CalendarTagProps = {
  data: TransferenceType
}

const CalendarTag = ({ data }: CalendarTagProps) => {
  const { setCurrentTransference, getIsLoading } = useTransferenceActions()
  const [isDragging, setIsDragging] = useState(false)
  const isDesktop = useMediaQuery({
    query: '(min-width: 1000px)'
  })
  const isLoading = getIsLoading()

  const typesClassName = {
    expense: "bg-red-500/80 dark:bg-red-400 text-white dark:text-red-950",
    income: "bg-green-600/90 dark:bg-green-400 text-white dark:text-green-950"
  }

  const className = twMerge(
    "w-full flex itens-center rounded-md px-1 py-[1px] cursor-pointer",
    "hover:opacity-80 transition-all shadow overflow-hidden",
    typesClassName[data.type],
    isDragging ? "invisible" : "visible",
    data.isPaid && "opacity-80"
  )

  const labelClassName = twMerge(
    "text-xs md:text-sm lg:text-base cursor-pointer",
    data.isPaid && "line-through"
  )

  const handleOpen = (event: React.MouseEvent) => {
    if (!isLoading) {
      event.stopPropagation()
      setCurrentTransference(data)
    }
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
      draggable={isDesktop && !isLoading}
      onClick={handleOpen}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <label className={labelClassName}>
        {data.name}
      </label>
    </div>
  )
}

export default CalendarTag