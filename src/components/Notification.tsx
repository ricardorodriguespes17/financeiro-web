import { MdError } from "react-icons/md"
import useNotificationStore from "../store/notificationStore"
import Card from "./Card"
import { twMerge } from "tailwind-merge"
import { IoIosWarning } from "react-icons/io"
import { FaCheckCircle } from "react-icons/fa"

const notificationTypes = {
  error: {
    className: "text-danger",
    Icon: MdError
  },
  warning: {
    className: "text-warning",
    Icon: IoIosWarning
  },
  success: {
    className: "text-primary-400",
    Icon: FaCheckCircle
  },
}

const Notification = () => {
  const { notification } = useNotificationStore()

  const className = twMerge(
    "fixed top-3 z-10 transition-all ease-in duration-400",
    "shadow-2xl w-[300px] flex-row justify-between gap-2",
    notification ? "right-6 opacity-100" : "-right-60 opacity-0",
  )

  const iconClassName = notification ? twMerge(
    "h-fit aspect-square rounded-full text-2xl flex justify-center items-center pt-[5px]",
    notificationTypes[notification.type].className
  ) : undefined

  const Icon = notification ? notificationTypes[notification.type].Icon : undefined

  return (
    <Card className={className}>
      <div className={iconClassName}>
        {Icon && <Icon />}
      </div>

      <div className="flex flex-1 flex-col">
        <h3>{notification?.title}</h3>
        <p>{notification?.content}</p>
      </div>
    </Card>
  )
}

export default Notification