import { twMerge } from "tailwind-merge"
import formatCurrency from "../../utils/formatCurrency"
import DataTable, { ColumnType } from "../ui/DataTable"
import useBoard from "../../store/boardStore"
import Button from "../ui/Button"
import { TransferenceType } from "../../@types/TransferenceType"
import useTransferenceModal from "../../store/tranferenceModalStore"
import { BiPlus } from "react-icons/bi"
import ActionsColumnTransferences from "./ActionsColumnTransferences"
import transferenceController from "../../controller/transferenceController"
import useNotificationStore from "../../store/notificationStore"
import useMonth from "../../store/monthStore"

const ExpensesBox = () => {
  const { monthDate } = useMonth()
  const { expenses, loadTransferences } = useBoard()
  const { setCurrentTransference } = useTransferenceModal()
  const { setNotification } = useNotificationStore()
  const total = expenses.reduce((p, c) => p + c.value, 0)

  const openTransference = (transference: TransferenceType | null) => {
    setCurrentTransference(transference)
  }

  const deleteTransference = async (transferenceId: string) => {
    const notification = await transferenceController.deleteTransference(transferenceId)

    if (notification.type === "success") {
      loadTransferences(monthDate)
    }

    setNotification(notification)
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
          <ActionsColumnTransferences
            handleOpen={() => openTransference(row)}
            handleDelete={() => deleteTransference(row.id)}
          />
        )
      }
    }
  ]

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h2>Despesas</h2>
        <Button
          size="fit"
          variant="plain"
          className="text-3xl aspect-square rounded-full"
          onClick={() => openTransference(null)}
        >
          <BiPlus />
        </Button>
      </div>

      <div className="flex flex-col flex-1">
        <DataTable<TransferenceType>
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