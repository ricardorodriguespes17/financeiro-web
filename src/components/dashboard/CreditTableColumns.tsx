import { CreditType } from "../../@types/CreditType"
import formatCurrency from "../../utils/formatCurrency"
import { ColumnType } from "../ui/DataTable"

const makeCreditTableColumns = (): ColumnType<CreditType>[] => {
  return [
    {
      title: "Nome",
      size: "full",
      render: (row) => {
        return (
          <label>{row.name}</label>
        )
      }
    },
    {
      title: "Vencimento",
      position: "center",
      render: (row) => {
        return (
          <label>Dia {row.expireDay}</label>
        )
      }
    },
    {
      title: "Num. Despesas",
      position: "center",
      render: (row) => {
        return (
          <label>{row.transferences.length}</label>
        )
      }
    },
    {
      title: "Fatura",
      position: "center",
      render: (row) => {
        const total = row.transferences.reduce((p, item) => p + item.value, 0)

        return (
          <label>{formatCurrency(total)}</label>
        )
      }
    },
    {
      title: "Limite",
      position: "center",
      render: (row) => {
        const limit = row.limit

        return (
          <label>{formatCurrency(limit)}</label>
        )
      }
    },
    {
      title: "Restante",
      position: "center",
      render: (row) => {
        const total = row.transferences.reduce((p, item) => p + item.value, 0)
        const limit = row.limit

        return (
          <label>{formatCurrency(limit - total)}</label>
        )
      }
    },
  ]
}

export default makeCreditTableColumns