import { twMerge } from "tailwind-merge"
import formatCurrency from "../../utils/formatCurrency"
import DataTable from "../ui/DataTable"
import Button from "../ui/Button"
import useTransferenceModal from "../../store/tranferenceModalStore"
import { TransferenceType } from "../../@types/TransferenceType"
import { BiPlus } from "react-icons/bi"
import Skeleton from "../Skeleton"
import { useMediaQuery } from "react-responsive"
import TransferenceTableColumns from "./TransferenceTableColumns"
import useTransferenceActions from "../../hooks/useTransferenceActions"

const IncomesBox = () => {
  const { getIncomes, isLoading } = useTransferenceActions()
  const { setCurrentTransference } = useTransferenceModal()
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
  })
  const incomes = getIncomes()
  const total = incomes.reduce((p, c) => p + c.value, 0)

  const openTransference = () => {
    setCurrentTransference({ type: "income" })
  }

  const columns = TransferenceTableColumns
  const className = "flex flex-col gap-2"
  const titleClassName = "flex items-center gap-2"
  const dataTableClass = "flex flex-col flex-1"

  if (isLoading) {
    return (
      <div className={className}>
        <div className={titleClassName}>
          <Skeleton className="w-[150px] h10" />
          <Skeleton className="w10 h10" />
        </div>

        <div className={dataTableClass}>
          <DataTable<TransferenceType>
            data={incomes}
            columns={[]}
            isLoading={isLoading}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className={titleClassName}>
        <h2>Receitas</h2>
        <Button
          size="fit"
          variant="plain"
          className="text-3xl aspect-square rounded-full"
          onClick={openTransference}
        >
          <BiPlus />
        </Button>
      </div>

      <div className={dataTableClass}>
        <DataTable<TransferenceType>
          data={incomes}
          columns={columns
            .filter(item => item.title !== "Descrição" || isDesktopOrLaptop)
          }
          isLoading={isLoading}
        />

        <div className={twMerge(
          "flex items-center w-full rounded-md text-xl px-3 py-2 font-bold",
          "bg-white dark:bg-gray-900 text-primary-800 dark:text-primary"
        )}>
          Total: {formatCurrency(total)}
        </div>
      </div>
    </div>
  )
}

export default IncomesBox