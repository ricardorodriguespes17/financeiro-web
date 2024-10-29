import months from "../constaints/months"

export const getCurrentDay = (): number => {
  const date = new Date()
  return date.getDate()
}

export const getCurrentMonthDate = (): string => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}

export const getMonthLabel = (monthDate: string): string => {
  const [yearString, monthString] = monthDate.split("-")
  const month = parseInt(monthString)
  const monthName = months[month - 1]
  
  if(monthName) {
    return `${monthName.toUpperCase()} ${yearString}`
  }

  return ""
}

export const getMonthYearNumber = (monthDate: string): { month: number, year: number } | null => {
  const [yearString, monthString] = monthDate.split("-")

  const month = parseInt(monthString)
  const year = parseInt(yearString)

  if(isNaN(month) || month > 12 || month < 1 || isNaN(year)) {
    return null
  }

  return { month, year }
}

export const changeMonthDate = (monthDate: string, position: number): string => {
  const [yearString, monthString] = monthDate.split("-")
  let month = parseInt(monthString)
  let year = parseInt(yearString)

  month += position
  
  while (month < 1) {
    month += 12;
    year--
  }

  while (month > 12) {
    month -= 12;
    year++
  }

  return `${year}-${String(month).padStart(2, "0")}`
}