import { useEffect, useState } from "react"
import useBoard from "../../store/boardStore"
import CardBalance from "./CardBalance"
import Skeleton from "../Skeleton"

type BalanceType = {
  name: string
  value: number
  color: "red" | "green" | "yellow"
}

const BalancesBox = () => {
  const { expenses, initialValue, incomes, isLoading } = useBoard()

  const [balances, setBalances] = useState<BalanceType[]>([])

  useEffect(() => {
    const totalExpensesValue = expenses.reduce((p, c) => p + c.value, 0)
    const totalIncomesValue = incomes.reduce((p, c) => p + c.value, 0)
    const finalBalance = initialValue || 0 + totalIncomesValue - totalExpensesValue

    setBalances(
      [
        { name: "Saldo inicial", value: initialValue || 0, color: "yellow" },
        { name: "Despesas totais", value: totalExpensesValue, color: "red" },
        { name: "Receitas totais", value: totalIncomesValue, color: "green" },
        { name: "Saldo final", value: finalBalance, color: finalBalance >= 0 ? "green" : "red" },
      ]
    )
  }, [expenses, incomes, initialValue])

  const className = "flex flex-col gap-2"
  const balancesClassName = "flex flex-1 gap-8 flex-wrap"

  if (isLoading) {
    return (
      <div className={className}>
        <Skeleton className="w-[150px] h-[40px] bg-primary-300 dark:bg-primary-700" />

        <div className={balancesClassName}>
          <Skeleton className="w-[250px] h-[85px]" />
          <Skeleton className="w-[250px] h-[85px]" />
          <Skeleton className="w-[250px] h-[85px]" />
          <Skeleton className="w-[250px] h-[85px]" />
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <h2>Saldos</h2>

      <div className={balancesClassName}>
        {balances.map((item, index) => (
          <CardBalance
            key={index}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export default BalancesBox