import { IoIosMenu } from "react-icons/io"
import Button from "./Button"
import Logo from "./Logo"
import useMenuStore from "../../store/menuStore"
import { twMerge } from "tailwind-merge"

type HeaderProps = {
  children?: React.ReactNode
  showMenuButton?: boolean
}

const Header = ({ children, showMenuButton }: HeaderProps) => {
  const { openMenu, closeMenu, isOpened } = useMenuStore()

  const toggleMenu = () => {
    if(isOpened) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  const className=twMerge(
    "w-full h-20 flex items-center px-8 py-[14px] justify-between",
    "bg-white dark:bg-black"
  )

  return (
    <header className={className}>
      <div className="flex items-center gap-6">
        {showMenuButton && (
          <Button
            size="fit"
            variant="plain"
            className="w-fit text-4xl hover:bg-transparent hover:opacity-85"
            onClick={toggleMenu}
          >
            <IoIosMenu />
          </Button>
        )}

        <div className="w-[200px]">
          <Logo />
        </div>
      </div>

      <div className="flex">
        {children}
      </div>
    </header>
  )
}

export default Header