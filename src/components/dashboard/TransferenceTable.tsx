import { useMediaQuery } from "react-responsive"
import useTransferenceActions from "../../hooks/useTransferenceActions"
import DataTable from "../ui/DataTable"
import { TransferenceType } from "../../@types/TransferenceType"
import { calculateSubTotal, calculateTotal } from "../../utils/calculateTotal"
import { useState } from "react"
import useMonth from "../../store/monthStore"
import makeTransferenceTableColumns from "./TransferenceTableColumns"
import TableHeader from "./TableHeader"
import TableFooter from "./TableFooter"

type TransferenceTableProps = {
  type: "expense" | "income"
}

const TransferenceTable = ({ type }: TransferenceTableProps) => {
  const {
    transferences: allTransferences,
    setCurrentTransference
  } = useTransferenceActions()
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
  })
  const { monthDate } = useMonth()
  const transferences = allTransferences.filter(item => item.type === type)
  const total = calculateTotal(transferences)
  const subTotal = calculateSubTotal(transferences, monthDate)
  const [isLoading] = useState(false)
  const columns = makeTransferenceTableColumns(monthDate)
  const className = "flex flex-col gap-2"
  const dataTableClass = "flex flex-col flex-1"
  const title = type === "expense" ? "Despesas" : "Receitas"

  const openTransference = () => {
    setCurrentTransference({ type })
  }

  if (isLoading) {
    return (
      <div className={className}>
        <div className={dataTableClass}>
          <DataTable<TransferenceType>
            data={[]}
            columns={columns}
            isLoading={isLoading}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <TableHeader
        title={title}
        onOpen={openTransference}
        hasChangeMode={type === "expense"}
      />

      <div className={dataTableClass}>
        <DataTable<TransferenceType>
          data={transferences}
          columns={columns
            .filter(item => !["Descrição", "Vencimento"].includes(item.title) || isDesktopOrLaptop)
          }
          isLoading={isLoading}
        />

        <TableFooter total={total} subTotal={subTotal} />
      </div>
    </div>
  )
}

export default TransferenceTable