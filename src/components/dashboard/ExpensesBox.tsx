import { twMerge } from "tailwind-merge"
import formatCurrency from "../../utils/formatCurrency"
import DataTable, { ColumnType } from "../ui/DataTable"

type ExpensesType = {
  name: string, value: number, expireDay: number
}

const ExpensesBox = () => {
  const expenses: ExpensesType[] = [
    { name: "Aluguel", value: 800, expireDay: 7 },
    { name: "Conta de luz", value: 100, expireDay: 20 },
    { name: "Conta de água", value: 100, expireDay: 20 },
    { name: "Internet", value: 100, expireDay: 21 },
    { name: "Fatura do cartão", value: 1800.90, expireDay: 21 },
  ]

  const total = expenses.reduce((p, c) => p + c.value,0)

  const columns: ColumnType<ExpensesType>[] = [
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
      <h2>Despesas</h2>

      <div className="flex flex-col flex-1">
        <DataTable<ExpensesType>
          data={expenses}
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

export default ExpensesBox