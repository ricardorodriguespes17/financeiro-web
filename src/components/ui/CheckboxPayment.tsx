import { twMerge } from "tailwind-merge"
import { TransferenceType } from "../../@types/TransferenceType"
import { CgCheck } from "react-icons/cg"
import useInstallmentActions from "../../hooks/useInstallmentActions"
import useMonth from "../../store/monthStore"
import { useEffect, useState } from "react"

type CheckBoxPaymentProps = {
  onClick?: () => void
  transference: TransferenceType
  size?: "sm" | "lg"
}

const CheckBoxPayment = ({ transference, size = "sm", onClick }: CheckBoxPaymentProps) => {
  const { monthDate } = useMonth()
  const { createInstallment, deleteInstallment, isLoading } = useInstallmentActions()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const installmentDataInMonth = transference.installments
      .find(item => item.dueMonth === monthDate)
    setChecked(!!installmentDataInMonth)
  }, [monthDate, transference.installments])

  const toggleIsPaid = async () => {
    const installmentData = transference.installments.find(item => item.dueMonth === monthDate)

    setChecked(checked => !checked)
    onClick?.()

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

  const sizes = {
    sm:
    {
      className: "h-5",
      iconClassName: "text-xl"
    },
    lg:
    {
      className: "h-10",
      iconClassName: "text-3xl"
    }
  }

  const className = twMerge(
    sizes[size].className,
    "cursor-pointer aspect-square appearance-none peer",
    "checked:bg-primary-500 bg-white rounded-md shadow hover:shadow-md",
    "border border-primary-500",
    "dark:checked:bg-primary-800 dark:bg-gray-900",
    "dark:checked:border-slate-800 dark:border-primary-800"
  )

  const iconClassName = twMerge(
    sizes[size].iconClassName,
    "absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2",
    "transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
  )

  return (
    <div className="inline-flex items-center">
      <label className="flex items-center cursor-pointer relative">
        <input
          readOnly
          checked={checked}
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