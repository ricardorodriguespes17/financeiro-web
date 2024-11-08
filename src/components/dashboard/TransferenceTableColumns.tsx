import { TransferenceType } from "../../@types/TransferenceType"
import calculateMonthDistance from "../../utils/calculateMonthDistance"
import formatCurrency from "../../utils/formatCurrency"
import CheckBoxPayment from "../ui/CheckboxPayment"
import { ColumnType } from "../ui/DataTable"
import ActionsColumnTransferences from "./ActionsColumnTransferences"

const makeTransferenceTableColumns = (monthDate: string) => {
  const transferenceTableColumns: ColumnType<TransferenceType>[] = [
    {
      title: "Nome",
      size: "full",
      render: (row) => {
        let parcel
  
        if(row.recurrenceLimit && row.recurrenceLimit !== 1) {
          const currentParcel = calculateMonthDistance(row.month, monthDate) + 1
  
          parcel = ` (${currentParcel}/${row.recurrenceLimit})`
        }
  
        return (
          <label>
            {row.name}
            <span>{parcel}</span>
          </label>
        )
      }
    },
    {
      title: "Valor",
      position: "center",
      render: (row) => {
        return (
          <label>{formatCurrency(row.value / (row.recurrenceLimit || 1))}</label>
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
          <label>{row.description || "-"}</label>
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

  return transferenceTableColumns
}



export default makeTransferenceTableColumns