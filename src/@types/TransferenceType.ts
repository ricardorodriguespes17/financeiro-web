import { InstallmentType } from "./InstallmentType"

export type TransferenceType = {
  name: string
  id: string
  value: number
  expireDay: number
  description?: string
  type: "expense" | "income" | "initial"
  month: string
  category: string | null
  recurrenceLimit: number | null
  userId: string
  installments: InstallmentType[]
}

export type TransferenceCreateType = Omit<Omit<Omit<TransferenceType, "id">, "userId">, "installments">