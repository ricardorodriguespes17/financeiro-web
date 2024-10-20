import { twMerge } from "tailwind-merge"
import formatCurrency from "../../utils/formatCurrency"
import DataTable, { ColumnType } from "../ui/DataTable"

type IncomeType = {
  name: string, value: number, expireDay: number
}

const IncomesBox = () => {
  const incomes: IncomeType[] = [
    { name: "Salário", value: 3000, expireDay: 7 },
    { name: "Fulano", value: 10, expireDay: 10 },
  ]

  const total = incomes.reduce((p, c) => p + c.value, 0)

  const columns: ColumnType<IncomeType>[] = [
    {
      title: "Nome",
      param: "name",
      render: (row) => {
        return (
          <label>{row.name}</label>
        )
      }
    },
    {
      title: "Valor",
      param: "value",
      render: (row) => {
        return (
          <label>{formatCurrency(row.value)}</label>
        )
      }
    },
    {
      title: "Vencimento",
      param: "expireDay",
      render: (row) => {
        return (
          <label>Dia {row.expireDay}</label>
        )
      }
    }
  ]

  return (
    <div className="flex flex-col gap-2">
      <h2>Receitas</h2>

      <div className="flex flex-col flex-1">
        <DataTable<IncomeType>
          data={incomes}
          columns={columns}
        />

        <div className={twMerge(
          "flex items-center w-full rounded-md text-xl",
          "bg-white text-primary-800 px-3 py-2 font-bold"
        )}>
          Total: {formatCurrency(total)}
        </div>
      </div>
    </div>
  )
}

export default IncomesBox