const calculateMonthDistance = (monthA: string, monthB: string) => {
  const [yearA, monthAValue] = monthA.split("-").map(Number)
  const [yearB, monthBValue] = monthB.split("-").map(Number)

  const yearDiff = yearB - yearA
  const monthDiff = monthBValue - monthAValue

  return yearDiff * 12 + monthDiff
}

export default calculateMonthDistance