import { IoIosMenu } from "react-icons/io"
import Button from "./Button"
import Logo from "./Logo"

type HeaderProps = {
  children?: React.ReactNode
  showMenuButton?: boolean
}

const Header = ({ children, showMenuButton }: HeaderProps) => {
  return (
    <header className="w-full h-20 flex items-center px-8 py-[14px] justify-between bg-white">
      <div className="flex items-center gap-6">
        {showMenuButton && (
          <Button
            size="fit"
            variant="plain"
            className="w-fit text-4xl hover:bg-transparent hover:opacity-85"
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