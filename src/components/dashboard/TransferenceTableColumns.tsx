import { TransferenceType } from "../../@types/TransferenceType"
import formatCurrency from "../../utils/formatCurrency"
import CheckBoxPayment from "../ui/CheckboxPayment"
import { ColumnType } from "../ui/DataTable"
import ActionsColumnTransferences from "./ActionsColumnTransferences"

const TransferenceTableColumns: ColumnType<TransferenceType>[] = [
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
    title: "Valor",
    position: "center",
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
    position: "center",
    size: "full",
    render: (row) => {
      return (
        <label>{row.description}</label>
      )
    }
  },
  {
    title: "Pago",
    position: "center",
    render: (row) => {
      return (
        <CheckBoxPayment transference={row} />
      )
    }
  },
  {
    title: "",
    size: "fit",
    position: "right",
    render: (row) => {
      return (
        <ActionsColumnTransferences transference={row} />
      )
    }
  }
]

export default TransferenceTableColumns