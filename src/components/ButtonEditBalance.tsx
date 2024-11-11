import { BiPencil, BiSave } from "react-icons/bi"
import { twMerge } from "tailwind-merge"

type ButtonEditBalanceProps = {
  isEditing: boolean
  className?: string
  onClick: () => void
}

const ButtonEditBalance = ({ isEditing, className, onClick }: ButtonEditBalanceProps) => {
  const buttonClassName = twMerge(
    className, "cursor-pointer hover:opacity-80 transition-opacity")

  return (
    <button className={buttonClassName} onClick={onClick}>
      {isEditing ? <BiSave /> : <BiPencil />}
    </button>
  )
}

export default ButtonEditBalance