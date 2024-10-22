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
    background: "bg-red-200",
    text: "text-red-800",
  },
  green: {
    background: "bg-green-200",
    text: "text-green-800",
  },
  yellow: {
    background: "bg-yellow-200",
    text: "text-yellow-800",
  },
}

const CardBalance = ({ name, value: finalValue, color }: CardBalanceProps) => {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if(percent < 100) {
      setTimeout(() => {
        setPercent(percent + 10)
      }, 50)
    }
  }, [finalValue, percent])

  return (
    <Card className="min-w-[280px]">
      <div className="flex gap-8">
        <div className="flex flex-col flex-1">
          <label>{name}</label>
          <h2>{formatCurrency(finalValue * percent / 100)}</h2>
        </div>
        <MdAccountBalanceWallet
          className={
            twMerge("text-5xl rounded-2xl p-2", colorClasses[color].background, colorClasses[color].text)
          }
        />
      </div>
    </Card>
  )
}

export default CardBalance