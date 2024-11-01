import { IconType } from "react-icons"
import { FaUser } from "react-icons/fa"
import { LuLayoutDashboard } from "react-icons/lu"

export type MenuType = {
  label: string
  href: string
  Icon: IconType
}

const menus: MenuType[] = [
  { label: "Dashboard", href: "/dashboard", Icon: LuLayoutDashboard },
  { label: "Perfil", href: "/profile", Icon: FaUser },
]

export default menus