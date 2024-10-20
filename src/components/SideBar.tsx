import { LuLayoutDashboard } from "react-icons/lu"
import Button from "./ui/Button"
import { IoMdCalendar } from "react-icons/io"
import { IoPower } from "react-icons/io5"
import { twMerge } from "tailwind-merge"
import { useNavigate } from "react-router-dom"
import useMenuStore from "../store/menuStore"

const SideBar = () => {
  const { isOpened } = useMenuStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/login")
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
      "h-screen bg-white flex flex-col gap-3 pt-4 px-4",
      "transition-all duration-500 ease-in-out",
    )}>
      <h2 className={twMerge(
        "mb-4 text-primary-700",
        isOpened ? "block" : "hidden"
      )}>
        Menu
      </h2>

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