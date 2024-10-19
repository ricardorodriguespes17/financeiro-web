import LinkComponent from "./Link"
import Logo from "./Logo"

const Header = () => {
  return (
    <header className="w-full h-20 flex items-center px-8 py-[14px] justify-between shadow-lg bg-white">
      <div className="w-[240px]">
        <Logo />
      </div>

      <div className="flex gap-4 w-[300px] h-full items-center">
        <LinkComponent variant="plain" to="/register">
          Criar conta
        </LinkComponent>
        <LinkComponent to="/login">
          Entre
        </LinkComponent>
      </div>
    </header>
  )
}

export default Header