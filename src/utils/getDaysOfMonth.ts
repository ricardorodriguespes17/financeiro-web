import { getMonthYearNumber } from "./getCurrentDate"
import getFirstDayOfMonth from "./getFirstDayOfMonth"
import getLastDayOfMonth from "./getLastDayOfMonth"

const getDaysOfMonth = (monthDate: string) => {
  const result = getMonthYearNumber(monthDate)

  if (result) {
    const firstDay = getFirstDayOfMonth(result.year, result.month) //semana
    const lastDay = getLastDayOfMonth(result.year, result.month) //numerico

    return new Array(lastDay + firstDay).fill(0).map((_item, index) => index - firstDay + 1)
  }

  return null
}

export default getDaysOfMonth