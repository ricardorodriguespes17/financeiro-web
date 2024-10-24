import CalendarCell from "./CalendarCell"

type CalendarRowProps = {
  rangeDays: number[]
}

const CalendarRow = ({ rangeDays }: CalendarRowProps) => {
  if(rangeDays.length === 0) {
    return <></>
  }

  return (
    <div className="flex w-full bg-gray-50">
      {rangeDays.map((day, index) => (
        <CalendarCell key={index} day={day} />
      ))}
    </div>
  )
}

export default CalendarRow