import { LuLayoutDashboard } from "react-icons/lu"
import Button from "./ui/Button"
import { IoMdCalendar } from "react-icons/io"
import { IoPower } from "react-icons/io5"
import { twMerge } from "tailwind-merge"
import { useState } from "react"

const SideBar = () => {
  const [isOpened] = useState(true)

  const handleLogout = () => {

  }

  const menu = [
    { label: "Dashboard", href: "/dashboard", Icon: LuLayoutDashboard, selected: true },
    { label: "Quadros", href: "/dashboard", Icon: IoMdCalendar },
    "separator",
    { label: "Sair", onClick: handleLogout, Icon: IoPower }
  ]


  return (
    <div className={twMerge(
      isOpened ? "w-[270px]" : "w-[90px]",
      "h-screen bg-white flex flex-col gap-3 pt-24 px-4",
      "transition-all duration-500 ease-in-out",
    )}>
      {menu.map(item => {
        if (typeof item === "string") {
          return (
            <hr className="border-separate" />
          )
        }

        return (
          <Button
            href={item.href}
            onClick={item.onClick}
            variant={item.selected ? "solid" : "plain"}
            size={isOpened ? "full" : "fit"}
            className="justify-start px-4 gap-0"
          >
            <item.Icon size={24} className="min-w-6" />
            <label className={twMerge(
              isOpened ? "w-fit ml-3" : "w-0",
              "overflow-hidden transition-all duration-300 text-nowrap ease-in-out"
            )}>
              {item.label}
            </label>
          </Button>
        )
      })}
    </div>
  )
}

export default SideBar