import { twMerge } from "tailwind-merge"
import { TransferenceType } from "../../@types/TransferenceType"
import { CgCheck } from "react-icons/cg"
import useInstallmentActions from "../../hooks/useInstallmentActions"
import useMonth from "../../store/monthStore"
import { useEffect, useState } from "react"
import { InstallmentType } from "../../@types/InstallmentType"

type CheckBoxPaymentProps = {
  transference: TransferenceType
}

const CheckBoxPayment = ({ transference }: CheckBoxPaymentProps) => {
  const { monthDate } = useMonth()
  const { createInstallment, deleteInstallment, isLoading } = useInstallmentActions()
  const [installmentData, setInstallmentData] = useState<InstallmentType>()

  useEffect(() => {
    setInstallmentData(transference.installments.find(item => item.dueMonth === monthDate))
  }, [monthDate, transference.installments])

  const toggleIsPaid = async () => {
    const installmentData = transference.installments.find(item => item.dueMonth === monthDate)

    if (installmentData) {
      await deleteInstallment(installmentData.id)
    } else {
      await createInstallment({
        amount: transference.value,
        dueMonth: monthDate,
        transferenceId: transference.id
      })
    }
  }

  const className = twMerge(
    "cursor-pointer h-5 aspect-square appearance-none peer",
    "checked:bg-primary-500 bg-white rounded-md shadow hover:shadow-md",
    "border border-primary-500",
    "dark:checked:bg-primary-800 dark:bg-gray-950",
    "dark:checked:border-slate-800 dark:border-primary-800"
  )

  const iconClassName = twMerge(
    "absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2",
    "transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-xl"
  )

  return (
    <div className="inline-flex items-center">
      <label className="flex items-center cursor-pointer relative">
        <input
          readOnly
          checked={!!installmentData}
          type="checkbox"
          disabled={isLoading}
          className={className}
          onClick={toggleIsPaid}
        />
        <span className={iconClassName}>
          <CgCheck />
        </span>
      </label>
    </div>
  )
}

export default CheckBoxPayment