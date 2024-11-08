export type InstallmentType = {
  id: string
  dueMonth: string
  amount: number
  transferenceId: string
}

export type InstallmentCreateType = Omit<InstallmentType, "id">