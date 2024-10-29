import { LuLayoutDashboard } from "react-icons/lu"
import Button from "./ui/Button"
import { IoPower } from "react-icons/io5"
import { twMerge } from "tailwind-merge"
import useMenuStore from "../store/menuStore"
import useTheme from "../store/themeStore"
import { FaMoon, FaRegSun, FaUser } from "react-icons/fa"
import useAuthActions from "../hooks/useAuthActions"
import { useState } from "react"
import { useLocation } from "react-router-dom"

const SideBar = () => {
  const { isOpened } = useMenuStore()
  const { logout } = useAuthActions()
  const { toggleTheme, themeMode } = useTheme()
  const { pathname } = useLocation()

  const handleLogout = async () => {
    await logout()
  }

  const [menu] = useState([
    { label: "Dashboard", href: "/dashboard", Icon: LuLayoutDashboard, selected: pathname === "/dashboard" },
    { label: "Perfil", href: "/profile", Icon: FaUser, selected: pathname === "/profile" },
    "separator",
    { label: "Tema", onClick: toggleTheme, Icon: themeMode === "dark" ? FaRegSun : FaMoon },
    { label: "Sair", onClick: handleLogout, Icon: IoPower }
  ])

  const className = twMerge(
    "h-full bg-white dark:bg-black flex flex-col items-center gap-3 pt-4 overflow-hidden",
    "transition-[width] duration-500 ease-in-out fixed md:static top-[76px] px-4",
    isOpened ? "w-[270px]" : "md:w-[90px] w-0",
  )

  const titleClassName = twMerge(
    "mb-4 text-primary-700 w-full",
    isOpened ? "block" : "hidden"
  )

  const labelClassName = twMerge(
    isOpened ? "w-fit ml-3" : "w-0",
    "overflow-hidden transition-all duration-300 text-nowrap ease-in-out"
  )

  const buttonClassName = twMerge(
    "w-full gap-0",
    isOpened ? "justify-start pl-4" : "justify-center pl-0"
  )

  return (
    <div className={className}>
      <h2 className={titleClassName}>
        Menu
      </h2>

      {menu.map((item, index) => {
        if (typeof item === "string")
          return <hr key={index} className="border-separate border-primary/30 w-full" />

        return (
          <Button
            key={index}
            href={item.href}
            onClick={item.onClick}
            variant={item.selected ? "solid" : "plain"}
            size={isOpened ? "full" : "fit"}
            className={buttonClassName}
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