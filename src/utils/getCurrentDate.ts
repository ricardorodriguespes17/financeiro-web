export const getCurrentDay = () => {
  const date = new Date()
  return date.getDate()
}

export const getCurrentMonthDate = (): string => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}