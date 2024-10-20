import CardBalance from "./CardBalance"

type BalanceType = {
  name: string
  value: number
  color: "red" | "green" | "yellow"
}

const BalancesBox = () => {
  const balances: BalanceType[] = [
    { name: "Saldo inicial", value: 0, color: "yellow" },
    { name: "Saldo atual", value: 2800, color: "yellow" },
    { name: "Despesas totais", value: 1100, color: "red" },
    { name: "Receitas totais", value: 3010, color: "green" },
    { name: "Saldo final", value: 1910, color: "green" },
  ]

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