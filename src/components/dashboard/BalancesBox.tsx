import { useEffect, useState } from "react"
import CardBalance from "./CardBalance"
import Skeleton from "../Skeleton"
import useTransferenceActions from "../../hooks/useTransferenceActions"
import { calculateSubTotal } from "../../utils/calculateTotal"

type BalanceType = {
  name: string
  value: number
  color: "red" | "green" | "yellow"
}

const BalancesBox = () => {
  const { getExpenses, getIncomes, getIsLoading } = useTransferenceActions()
  const [balances, setBalances] = useState<BalanceType[]>([])
  const expenses = getExpenses()
  const incomes = getIncomes()
  const isLoading = getIsLoading()

  useEffect(() => {
    const totalExpensesValue = calculateSubTotal(expenses)
    const totalIncomesValue = calculateSubTotal(incomes)
    const finalBalance = totalIncomesValue - totalExpensesValue

    setBalances(
      [
        { name: "Saldo inicial", value: 0, color: "yellow" },
        { name: "Despesas totais", value: totalExpensesValue, color: "red" },
        { name: "Receitas totais", value: totalIncomesValue, color: "green" },
        { name: "Saldo final", value: finalBalance, color: finalBalance >= 0 ? "green" : "red" },
      ]
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

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