import { twMerge } from "tailwind-merge"
import Card from "../Card"
import Skeleton from "../Skeleton"

type DataTableProps<T> = {
  data: T[]
  columns: ColumnType<T>[]
  isLoading?: boolean
}

export type ColumnType<T> = {
  title: string
  position?: "left" | "right" | "center"
  size?: "fit" | "normal" | "full"
  render: (row: T) => React.ReactNode
}

const DataTable = <T,>(props: DataTableProps<T>) => {
  const {
    data,
    columns,
    isLoading,
  } = props

  const rowClassName = "w-full py-2 px-4 flex items-center gap-4"

  if (isLoading) {
    return (
      <div className="w-full flex flex-col p-0">
        <Skeleton className="w-full h-10 bg-primary-300" />
        <div>
          <Skeleton className="w-full h-10 odd:bg-gray-200 dark:odd:bg-gray-800" />
          <Skeleton className="w-full h-10 odd:bg-gray-200 dark:odd:bg-gray-800" />
          <Skeleton className="w-full h-10 odd:bg-gray-200 dark:odd:bg-gray-800" />
          <Skeleton className="w-full h-10 odd:bg-gray-200 dark:odd:bg-gray-800" />
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full flex flex-col p-0">
      <header className={twMerge(
        rowClassName,
        "bg-primary-600 dark:bg-primary-800 text-white rounded-md"
      )}>
        {columns.map(({ title, position = "left", size = "normal" }, index) => {
          const className = twMerge(
            "w-[80px] md:w-[150px] flex items-center uppercase text-sm md:text-base",
            size === "full" && "flex-1",
            position === "left"
              ? "justify-start"
              : position === "center" ? "justify-center" : "justify-end",
          )

          return (
            <h5 key={index} className={className}>
              {title}
            </h5>
          )
        })}
      </header>

      <main className="flex flex-col w-full">
        {data.map((row, index) => (
          <div
            key={index}
            className={twMerge(
              rowClassName,
              "odd:bg-gray-50 dark:odd:bg-gray-900 duration-200",
              "hover:bg-primary-100 dark:hover:bg-primary-900"
            )}
          >
            {columns.map(({ render, position = "left", size = "normal" }, index) => {
              const className = twMerge(
                "w-[80px] md:w-[150px] flex items-center text-sm md:text-base",
                size === "full" && "flex-1",
                position === "left"
                  ? "justify-start"
                  : position === "center" ? "justify-center" : "justify-end",
              )

              return (
                <div key={index} className={className}>
                  {render(row)}
                </div>
              )
            })}
          </div>
        ))}
      </main>
    </Card>
  )
}

export default DataTable