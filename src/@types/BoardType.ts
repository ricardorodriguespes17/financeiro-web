import { TransferenceType } from "./TransferenceType"

export type BoardType = {
  id: string
  initialValue: number
  transferences: TransferenceType[]
  userId: string
}

export type BoardCreateType = {
  id: string
}

export type BoardUpdateType = {
  initialValue: number
}