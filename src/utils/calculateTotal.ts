import { TransferenceType } from "../@types/TransferenceType"

export const calculateTotal = (transferences: TransferenceType[]): number => {
  const total = transferences.reduce((p, c) => p + c.value / (c.recurrenceLimit || 1), 0)

  return total
}

export const calculateSubTotal = (transferences: TransferenceType[], monthDate: string): number => {
  const total = transferences.reduce((p, item) => {
    if (!item.installments.find(i => i.dueMonth === monthDate)) {
      return p + item.value / (item.recurrenceLimit || 1)
    }

    return p
  }, 0)

  return total
}