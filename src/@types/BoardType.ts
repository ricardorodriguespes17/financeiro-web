import { TransferenceType } from "./TransferenceType"

export type BoardType = {
  id: string
  name: string
  initialValue: number
  transferences: TransferenceType[]
  userId: string
}

export type BoardCreateType = {
  name: string
}

export type BoardUpdateType = {
  initialValue: number
}