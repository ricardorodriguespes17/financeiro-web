export type TransferenceType = {
  id: string
  name: string
  value: number
  expireDay: number
  description?: string
  type: "expense" | "income"
  isPaid: boolean
  boardId: string
}

export type TransferenceCreateType = Omit<TransferenceType, "id">