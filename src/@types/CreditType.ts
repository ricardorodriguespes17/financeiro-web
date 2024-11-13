import { TransferenceType } from "./TransferenceType"

export type CreditType = {
  id: string
  name: string
  color: string
  expireDay: number
  limit: number
  userId: string
  transferences: TransferenceType[]
}