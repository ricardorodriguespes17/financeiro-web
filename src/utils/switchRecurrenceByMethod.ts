const switchRecurrenceByMethod = (method: string, recurrenceLimit: number) => {
  switch(method) {
    case "unique":
      return 1
    case "parceled":
      return recurrenceLimit
    default:
      return null
  }
}

export default switchRecurrenceByMethod