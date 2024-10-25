import { LuLayoutDashboard } from "react-icons/lu"
import Button from "./ui/Button"
import { IoMdCalendar } from "react-icons/io"
import { IoPower } from "react-icons/io5"
import { twMerge } from "tailwind-merge"
import { useNavigate } from "react-router-dom"
import useMenuStore from "../store/menuStore"
import useAuthStore from "../store/authStore"
import useTheme from "../store/themeStore"
import { FaMoon, FaRegSun } from "react-icons/fa"

const SideBar = () => {
  const navigate = useNavigate()
  const { isOpened } = useMenuStore()
  const { onLogout } = useAuthStore()
  const { toggleTheme, themeMode } = useTheme()

  const handleLogout = async () => {
    onLogout()
    navigate("/login")
  }

  const menu = [
    { label: "Dashboard", href: "/dashboard", Icon: LuLayoutDashboard, selected: true },
    { label: "Quadros", href: "/dashboard", Icon: IoMdCalendar },
    "separator",
    { label: "Tema", onClick: toggleTheme, Icon: themeMode === "dark" ? FaRegSun : FaMoon },
    { label: "Sair", onClick: handleLogout, Icon: IoPower }
  ]

  const className = twMerge(
    "h-full bg-white dark:bg-black flex flex-col items-center gap-3 pt-4 overflow-hidden",
    "transition-[width] duration-500 ease-in-out fixed md:static top-[76px]",
    isOpened ? "w-[270px] px-4" : "md:w-[90px] w-0 px-0",
  )

  const titleClassName = twMerge(
    "mb-4 text-primary-700 w-full",
    isOpened ? "block" : "hidden"
  )

  const labelClassName = twMerge(
    isOpened ? "w-fit ml-3" : "w-0",
    "overflow-hidden transition-all duration-300 text-nowrap ease-in-out"
  )

  return (
    <div className={className}>
      <h2 className={titleClassName}>
        Menu
      </h2>

      {menu.map((item, index) => {
        if (typeof item === "string")
          return <hr key={index} className="border-separate" />

        return (
          <Button
            key={index}
            href={item.href}
            onClick={item.onClick}
            variant={item.selected ? "solid" : "plain"}
            size={isOpened ? "full" : "fit"}
            className="justify-start px-4 gap-0"
          >
            <item.Icon size={24} className="min-w-6" />
            <label className={labelClassName}>
              {item.label}
            </label>
          </Button>
        )
      })}
    </div>
  )
}

export default SideBar