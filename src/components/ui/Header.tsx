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

      <div>
        {children}
      </div>
    </header>
  )
}

export default Header