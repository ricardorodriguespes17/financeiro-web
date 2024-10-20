import { MdAccountBalanceWallet } from "react-icons/md"
import Card from "../Card"
import { twMerge } from "tailwind-merge"
import formatCurrency from "../../utils/formatCurrency"

type CardBalanceProps = {
  name: string
  value: number
  color: "red" | "green" | "yellow"
}

const CardBalance = ({ name, value, color }: CardBalanceProps) => {
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

  return (
    <Card className="min-w-[280px]">
      <div className="flex gap-8">
        <div className="flex flex-col flex-1">
          <label>{name}</label>
          <h2>{formatCurrency(value)}</h2>
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