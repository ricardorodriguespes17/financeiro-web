import Button from "./ui/Button"
import { IoPower } from "react-icons/io5"
import { twMerge } from "tailwind-merge"
import useMenuStore from "../store/menuStore"
import useTheme from "../store/themeStore"
import { FaMoon, FaRegSun } from "react-icons/fa"
import useAuthActions from "../hooks/useAuthActions"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import menus from "../menu"

const SideBar = () => {
  const { isOpened, closeMenu } = useMenuStore()
  const { logout } = useAuthActions()
  const { toggleTheme, themeMode } = useTheme()
  const { pathname } = useLocation()

  useEffect(() => {
    closeMenu()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const handleLogout = async () => {
    await logout()
  }

  const [submMenu] = useState([
    { label: "Tema", onClick: toggleTheme, Icon: themeMode === "dark" ? FaRegSun : FaMoon },
    { label: "Sair", onClick: handleLogout, Icon: IoPower }
  ])

  const className = twMerge(
    "h-full bg-white dark:bg-black flex flex-col items-center gap-3 pt-4",
    "transition-[width] duration-500 ease-in-out fixed md:static top-[76px]",
    "overflow-hidden px-4 z-10",
    isOpened ? "w-[270px]" : "md:w-[90px] w-0 md:px-4 px-0",
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

      {menus.map(item => {
        return (
          <Button
            key={item.href}
            href={item.href}
            variant={pathname === item.href ? "solid" : "plain"}
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

      <hr className="border-separate border-primary/30 w-full" />

      {submMenu.map((item, index) => {
        return (
          <Button
            key={index}
            onClick={item.onClick}
            variant="plain"
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