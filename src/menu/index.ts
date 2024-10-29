import { IconType } from "react-icons"
import { CgBoard } from "react-icons/cg"
import { FaUser } from "react-icons/fa"
import { LuLayoutDashboard } from "react-icons/lu"

export type MenuType = {
  label: string
  href: string
  Icon: IconType
}

const menus: MenuType[] = [
  { label: "Dashboard", href: "/dashboard", Icon: LuLayoutDashboard },
  { label: "Quadros", href: "/boards", Icon: CgBoard },
  { label: "Perfil", href: "/profile", Icon: FaUser },
]

export default menus