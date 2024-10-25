import { MdAccountBalanceWallet } from "react-icons/md"
import Card from "../Card"
import { twMerge } from "tailwind-merge"
import formatCurrency from "../../utils/formatCurrency"
import { useEffect, useState } from "react"

type CardBalanceProps = {
  name: string
  value: number
  color: "red" | "green" | "yellow"
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

const CardBalance = ({ name, value: finalValue, color }: CardBalanceProps) => {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (percent < 100) {
      setTimeout(() => {
        setPercent(percent + 10)
      }, 50)
    }
  }, [finalValue, percent])

  return (
    <Card className="min-w-[250px] w-full md:w-fit">
      <div className="flex gap-8">
        <div className="flex flex-col flex-1">
          <label className="text-sm text-gray-500 dark:text-gray-400">{name}</label>
          <h3>{formatCurrency(finalValue * percent / 100)}</h3>
        </div>
        <MdAccountBalanceWallet
          className={
            twMerge(
              "text-5xl rounded-2xl p-2",
              colorClasses[color].background, colorClasses[color].text
            )
          }
        />
      </div>
    </Card>
  )
}

export default CardBalance