export type TransferenceType = {
  id: string
  name: string
  value: number
  expireDay: number
  description?: string
  type: "expense" | "income"
  boardId: string
}