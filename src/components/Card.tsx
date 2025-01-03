import { twMerge } from "tailwind-merge"

type CardProps = {
  children?: React.ReactNode
  className?: string
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={twMerge(
      "bg-white dark:bg-gray-800 flex flex-col rounded-md p-4",
      className
    )}>
      {children}
    </div>
  )
}

export default Card