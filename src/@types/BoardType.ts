import { TransferenceType } from "./TransferenceType"

export type BoardType = {
  id: string
  initialValue: number
  transferences: TransferenceType[]
  userId: string
}

export type BoardCreateType = {
  initialValue: number
  userId: string
}

export type BoardUpdateType = {
  initialValue: number
}