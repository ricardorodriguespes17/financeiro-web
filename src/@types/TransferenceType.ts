import { InstallmentType } from "./InstallmentType"

export type TransferenceType = {
  name: string
  id: string
  value: number
  expireDay: number
  description?: string
  isPaid: boolean
  type: "expense" | "income"
  month: string
  category: string | null
  recurrenceLimit: number | null
  userId: string
  installments: InstallmentType[]
}

export type TransferenceCreateType = Omit<Omit<TransferenceType, "id">, "userId">