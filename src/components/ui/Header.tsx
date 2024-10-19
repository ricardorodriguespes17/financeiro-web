import Logo from "./Logo"

type HeaderProps = {
  children?: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="w-full h-20 flex items-center px-8 py-[14px] justify-between shadow-lg bg-white">
      <div className="w-[240px]">
        <Logo />
      </div>

      <div className="flex gap-4 w-[300px] h-full items-center">
        {children}
      </div>
    </header>
  )
}

export default Header