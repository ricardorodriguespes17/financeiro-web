import { useEffect, useState } from "react"
import useBoard from "../../store/boardStore"
import CardBalance from "./CardBalance"

type BalanceType = {
  name: string
  value: number
  color: "red" | "green" | "yellow"
}

const BalancesBox = () => {
  const { expenses, initialValue, incomes } = useBoard()

  const [balances, setBalances] = useState<BalanceType[]>([])

  useEffect(() => {
    const totalExpensesValue = expenses.reduce((p, c) => p + c.value, 0)
    const totalIncomesValue = incomes.reduce((p, c) => p + c.value, 0)
    const finalBalance = initialValue + totalIncomesValue - totalExpensesValue

    setBalances(
      [
        { name: "Saldo inicial", value: initialValue, color: "yellow" },
        { name: "Despesas totais", value: totalExpensesValue, color: "red" },
        { name: "Receitas totais", value: totalIncomesValue, color: "green" },
        { name: "Saldo final", value: finalBalance, color: finalBalance >= 0 ? "green" : "red" },
      ]
    )
  }, [expenses, incomes, initialValue])

  return (
    <div className="flex flex-col gap-2">
      <h2>Saldos</h2>

      <div className="flex flex-1 gap-8 flex-wrap">
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