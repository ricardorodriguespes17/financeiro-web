import { twMerge } from "tailwind-merge"
import { TransferenceType } from "../../@types/TransferenceType"
import useTransferenceActions from "../../hooks/useTransferenceActions"
import { CgCheck } from "react-icons/cg"

type CheckBoxPaymentProps = {
  transference: TransferenceType
}

const CheckBoxPayment = ({ transference }: CheckBoxPaymentProps) => {
  const { updateTransference, getIsLoading } = useTransferenceActions()
  const isLoading = getIsLoading()

  const toggleIsPaid = async () => {
    const transferenceData = {
      ...transference,
      id: undefined,
      isPaid: !transference.isPaid
    }

    await updateTransference(transference.id, transferenceData)
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
          checked={transference.isPaid}
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