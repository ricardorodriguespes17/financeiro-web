import { twMerge } from "tailwind-merge"
import HomeAnimation from "../components/HomeAnimation"
import Button from "../components/ui/Button"
import Header from "../components/ui/Header"

const HomePage = () => {
  return (
    <div className="w-full h-full overflow-auto flex flex-col">
      <Header>
        <Button className="hidden md:flex" variant="plain" href="/register">
          Criar conta
        </Button>
        <Button className="hidden md:flex" href="/login">
          Entre
        </Button>
      </Header>

      <main className={twMerge(
        "flex-1 w-full flex flex-col lg:flex-row",
        "bg-gradient-to-t from-primary-200 dark:from-primary-900 to-white dark:to-black"
      )}>
        <div className="flex flex-col flex-1 justify-center px-4 md:pl-10">
          <h1 className="w-[600px] max-w-full text-6xl mb-4 dark:text-primary-300">
            Gerencie suas finanças de forma simples e inteligente
          </h1>
          <p className="w-full text-xl mb-10 dark:text-white">
            Com nosso sistema, você pode gerenciar seus gastos, controlar saldos
            projetar futuros gastos e organizar sua renda em um só lugar.
          </p>
          <div className="flex justify-center w-full md:w-[250px] md:justify-start h-12 gap-3">
            <Button href="/register">
              Criar conta
            </Button>
            <Button href="/login">
              Entre agora
            </Button>
          </div>
        </div>

        <div className="flex flex-col flex-1 justify-center items-center">
          <div className="w-[480px]">
            <HomeAnimation />
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage