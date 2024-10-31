import { useMediaQuery } from "react-responsive"
import useBoardActions from "../../hooks/useBoardActions"
import useTransferenceActions from "../../hooks/useTransferenceActions"
import TransferenceTableColumns from "./TransferenceTableColumns"
import Skeleton from "../Skeleton"
import DataTable from "../ui/DataTable"
import { TransferenceType } from "../../@types/TransferenceType"
import Button from "../ui/Button"
import { BiPlus } from "react-icons/bi"
import ButtonChangeMode from "./ButtonChangeMode"
import { twMerge } from "tailwind-merge"
import formatCurrency from "../../utils/formatCurrency"
import { calculateSubTotal, calculateTotal } from "../../utils/calculateTotal"

type TransferenceTableProps = {
  type: "expense" | "income"
}

const TransferenceTable = ({ type }: TransferenceTableProps) => {
  const {
    getExpenses,
    getIncomes,
    setCurrentTransference
  } = useTransferenceActions()
  const { getIsLoading } = useBoardActions()
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
  })
  const transferences = type === "expense" ? getExpenses() : getIncomes()
  const total = calculateTotal(transferences)
  const subTotal = calculateSubTotal(transferences)
  const isLoading = getIsLoading()
  const columns = TransferenceTableColumns
  const className = "flex flex-col gap-2"
  const titleClassName = "flex items-center gap-2"
  const dataTableClass = "flex flex-col flex-1"
  const title = type === "expense" ? "Despesas" : "Receitas"

  const openTransference = () => {
    setCurrentTransference({ type })
  }


  if (isLoading) {
    return (
      <div className={className}>
        <div className={titleClassName}>
          <Skeleton className="w-[150px] h10" />
          <Skeleton className="w10 h10" />
        </div>
        <Skeleton className="w10 h10" />

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
      <div className="flex items-center justify-between">
        <div className={titleClassName}>
          <h2>{title}</h2>
          <Button
            size="fit"
            variant="plain"
            className="text-3xl aspect-square rounded-full"
            onClick={openTransference}
          >
            <BiPlus />
          </Button>
        </div>
        {type === "expense" && (
          <ButtonChangeMode />
        )}
      </div>

      <div className={dataTableClass}>
        <DataTable<TransferenceType>
          data={transferences}
          columns={columns
            .filter(item => !["Descrição", "Vencimento"].includes(item.title) || isDesktopOrLaptop)
          }
          isLoading={isLoading}
        />

        <div className={twMerge(
          "flex items-center w-full gap-8 rounded-md text-xl px-3 py-2 font-bold",
          "bg-white dark:bg-gray-900 text-primary-800 dark:text-primary"
        )}>
          <label>Total: {formatCurrency(total)}</label>
          {total !== subTotal && (
            <label>Subtotal: {formatCurrency(subTotal)}</label>
          )}
        </div>
      </div>
    </div>
  )
}

export default TransferenceTable