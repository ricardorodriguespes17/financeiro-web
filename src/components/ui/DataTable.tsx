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
  render: (row: T) => React.ReactNode
}

const DataTable = <T,>(props: DataTableProps<T>) => {
  const {
    data,
    columns,
    isLoading
  } = props

  const rowClassName = "w-full py-2 px-4 flex items-center gap-4"

  if (isLoading) {
    return (
      <div className="w-full flex flex-col p-0">
        <Skeleton className="w-full h-10 bg-primary-300" />
        <div>
          <Skeleton className="w-full h-10 odd:bg-gray-200" />
          <Skeleton className="w-full h-10 odd:bg-gray-200" />
          <Skeleton className="w-full h-10 odd:bg-gray-200" />
          <Skeleton className="w-full h-10 odd:bg-gray-200" />
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full flex flex-col p-0">
      <header className={twMerge(
        rowClassName,
        "bg-primary-600 text-white rounded-md"
      )}>
        {columns.map(({ title, position = "left" }, index) => {
          const className = twMerge(
            "flex-1 flex items-center uppercase",
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
            className={twMerge(rowClassName, "odd:bg-gray-50 hover:bg-primary-100 duration-200")}
          >
            {columns.map(({ render, position = "left" }, index) => {
              const className = twMerge(
                "flex-1 flex items-center",
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