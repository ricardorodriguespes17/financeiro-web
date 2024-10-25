import { TransferenceType } from "../../@types/TransferenceType"
import formatCurrency from "../../utils/formatCurrency"
import { ColumnType } from "../ui/DataTable"
import ActionsColumnTransferences from "./ActionsColumnTransferences"

const TransferenceTableColumns: ColumnType<TransferenceType>[] = [
  {
    title: "Nome",
    render: (row) => {
      return (
        <label>{row.name}</label>
      )
    }
  },
  {
    title: "Valor",
    render: (row) => {
      return (
        <label>{formatCurrency(row.value)}</label>
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
    title: "Descrição",
    render: (row) => {
      return (
        <label>{row.description}</label>
      )
    }
  },
  {
    title: "",
    position: "right",
    render: (row) => {
      return (
        <ActionsColumnTransferences transference={row} />
      )
    }
  }
]

export default TransferenceTableColumns