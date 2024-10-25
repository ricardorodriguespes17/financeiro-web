import PresentationAnimation from "../PresentationAnimation"
import Logo from "../ui/Logo"

type AuthBaseLayoutProps = {
  title: string
  children: React.ReactNode
}

const AuthBaseLayout = ({ title, children }: AuthBaseLayoutProps) => {
  return (
    <div className="w-full h-full flex bg-white dark:bg-black">
      <div className="flex-1 hidden md:flex flex-col items-center justify-center">
        <div className="w-1/2">
          <Logo />
        </div>
        <div className="w-[40%]">
          <PresentationAnimation />
        </div>
        <strong className="mx-10 text-center text-gray-700 text-[90%]">
          Organize suas finanças de forma simples e eficiente. Gerencie seus
          gastos, saldos e renda em um só lugar.
        </strong>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="flex flex-col w-full py-6 gap-6 items-center px-10 overflow-auto">
          <h1>{title}</h1>

          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthBaseLayout