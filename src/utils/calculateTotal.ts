import { TransferenceType } from "../@types/TransferenceType"
import { getCurrentDay, getCurrentMonthDate } from "./getCurrentDate"

export const calculateTotal = (transferences: TransferenceType[]): number => {
  const total = transferences.reduce((p, c) => p + c.value, 0)

  return total
}

export const calculateSubTotal = (transferences: TransferenceType[]): number => {
  const day = getCurrentDay()
  const month = getCurrentMonthDate()

  const total = transferences.reduce((p, c) => {
    if(c.boardId === month && c.expireDay > day) {
      return p + c.value
    }

    return p
  }, 0)

  return total
}