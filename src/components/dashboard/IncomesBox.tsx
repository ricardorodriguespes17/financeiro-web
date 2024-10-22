import { twMerge } from "tailwind-merge"
import formatCurrency from "../../utils/formatCurrency"
import DataTable, { ColumnType } from "../ui/DataTable"
import useBoard from "../../store/boardStore"
import Button from "../ui/Button"
import { IoMdEye } from "react-icons/io"
import { FaTrashAlt } from "react-icons/fa"
import useTransferenceModal from "../../store/tranferenceModalStore"
import { TransferenceType } from "../../@types/TransferenceType"

const IncomesBox = () => {
  const { incomes } = useBoard()
  const { setCurrentTransference } = useTransferenceModal()
  const total = incomes.reduce((p, c) => p + c.value, 0)

  const openTransference = (transference: TransferenceType) => {
    setCurrentTransference(transference)
  }

  const columns: ColumnType<TransferenceType>[] = [
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
      render: (row) => {
        return (
          <label>Dia {row.expireDay}</label>
        )
      }
    },
    {
      title: "",
      render: (row) => {
        return (
          <div className="flex items-center gap-8">
            <Button
              size="fit"
              className="h-fit text-2xl rounded-full hover:text-warning"
              variant="plain"
              onClick={() => openTransference(row)}
            >
              <IoMdEye />
            </Button>
            <Button size="fit" className="h-fit text-xl rounded-full hover:text-danger" variant="plain">
              <FaTrashAlt />
            </Button>
          </div>
        )
      }
    }
  ]

  return (
    <div className="flex flex-col gap-2">
      <h2>Receitas</h2>

      <div className="flex flex-col flex-1">
        <DataTable<TransferenceType>
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