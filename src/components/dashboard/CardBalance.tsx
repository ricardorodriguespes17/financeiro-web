import { MdAccountBalanceWallet } from "react-icons/md"
import Card from "../Card"
import { twMerge } from "tailwind-merge"
import formatCurrency from "../../utils/formatCurrency"
import { useEffect, useState } from "react"
import TextInput from "../ui/TextInput"
import ButtonEditBalance from "../ButtonEditBalance"
import useTransferenceActions from "../../hooks/useTransferenceActions"
import useMonth from "../../store/monthStore"

type CardBalanceProps = {
  name: string
  value: number
  color: "red" | "green" | "yellow"
  editable?: boolean
}

const colorClasses = {
  red: {
    background: "bg-red-200 dark:bg-red-500",
    text: "text-red-800 dark:text-red-900",
  },
  green: {
    background: "bg-green-200 dark:bg-green-600",
    text: "text-green-800 dark:text-green-900",
  },
  yellow: {
    background: "bg-yellow-200 dark:bg-yellow-600",
    text: "text-yellow-800 dark:text-yellow-950",
  },
}

const CardBalance = ({ name, value: finalValue, color, editable = false }: CardBalanceProps) => {
  const { updateTransference, createTransference, transferences } = useTransferenceActions()
  const { monthDate } = useMonth()
  const [percent, setPercent] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [editingValue, setEditingValue] = useState("")
  const buttonClass = "text-4xl rounded-2xl p-2"

  useEffect(() => {
    if (percent < 100) {
      setTimeout(() => {
        setPercent(percent + 10)
      }, 50)
    }
  }, [finalValue, percent])

  useEffect(() => {
    setEditingValue(finalValue.toFixed(2))
  }, [finalValue])

  const handleEdit = async () => {
    const newValue = parseFloat(editingValue)
    if (isEditing && !isNaN(newValue)) {
      const transference = transferences.find(item => item.type === "initial")

      if (transference) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, installments, ...rest } = transference

        if (transference.value != newValue) {
          await updateTransference(id, { ...rest, value: newValue })
        }
      } else {
        await createTransference({
          name: "Saldo atual",
          expireDay: 1,
          month: monthDate,
          recurrenceLimit: 1,
          value: newValue,
          category: null,
          type: "initial",
        })
      }
    }

    setIsEditing(value => !value)
  }

  return (
    <Card className="min-w-[250px] w-full md:w-fit">
      <div className="flex gap-8">
        <div className="flex flex-col justify-center flex-1">
          {isEditing
            ? (
              <TextInput
                type="number"
                min={0}
                value={editingValue}
                onChange={({ target }) => setEditingValue(target.value)}
                className="w-32"
              />
            )
            : (
              <>
                <label className="text-sm text-gray-500 dark:text-gray-400">{name}</label>
                <h3>{formatCurrency(finalValue * percent / 100)}</h3>
              </>
            )
          }
        </div>

        {editable ? (
          <ButtonEditBalance
            isEditing={isEditing}
            className={twMerge(
              buttonClass,
              colorClasses.yellow.background,
              colorClasses.yellow.text
            )}
            onClick={handleEdit}
          />
        ) : (
          <button
            className={
              twMerge(
                buttonClass,
                colorClasses[color].background,
                colorClasses[color].text
              )
            }
          >
            <MdAccountBalanceWallet />
          </button>
        )}
      </div>
    </Card>
  )
}

export default CardBalance