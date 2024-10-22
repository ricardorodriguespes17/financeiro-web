import { twMerge } from "tailwind-merge"
import Card from "../Card"

type DataTableProps<T> = {
  data: T[]
  columns: ColumnType<T>[]
}

export type ColumnType<T> = {
  title: string
  render: (row: T) => React.ReactNode
}

const DataTable = <T,>(props: DataTableProps<T>) => {
  const {
    data,
    columns
  } = props


  const rowClassName = "w-full py-2 px-4 flex items-center gap-4"

  return (
    <Card className="w-full flex flex-col p-0">
      <header className={twMerge(
        rowClassName,
        "bg-primary-600 text-white rounded-md"
      )}>
        {columns.map(({ title }, index) => (
          <h5 key={index} className="flex-1 uppercase">{title}</h5>
        ))}
      </header>

      <main className="flex flex-col w-full">
        {data.map((row, index) => (
          <div
            key={index}
            className={twMerge(rowClassName, "odd:bg-gray-50")}
          >
            {columns.map(({ render }, index) => (
              <div key={index} className="flex-1">
                {render(row)}
              </div>
            ))}
          </div>
        ))}
      </main>
    </Card>
  )
}

export default DataTable