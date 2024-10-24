const getFirstDayOfMonth = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1)
  
  return firstDay.getDay()
}

export default getFirstDayOfMonth