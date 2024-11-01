export type TransferenceType = {
  name: string
  id: string
  value: number
  expireDay: number
  description?: string
  isPaid: boolean
  type: "expense" | "income"
  month: string
  category?: string
  recurrenceLimit?: number
  userId: string
}

export type TransferenceCreateType = Omit<TransferenceType, "id">