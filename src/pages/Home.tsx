import HomeAnimation from "../components/HomeAnimation"
import Button from "../components/ui/Button"
import Header from "../components/ui/Header"

const HomePage = () => {
  return (
    <div className="w-full h-full overflow-auto flex flex-col">
      <Header>
        <Button variant="plain" href="/register">
          Criar conta
        </Button>
        <Button href="/login">
          Entre
        </Button>
      </Header>

      <main className="flex-1 w-full flex flex-col lg:flex-row bg-gradient-to-t from-primary-200 to-white">
        <div className="flex flex-col flex-1 justify-center pl-10">
          <h1 className="w-[600px] max-w-full text-6xl mb-4">
            Gerencie suas finanças de forma simples e inteligente
          </h1>
          <p className="w-full text-xl mb-10">
            Com nosso sistema, você pode gerenciar seus gastos, controlar saldos
            projetar futuros gastos e organizar sua renda em um só lugar.
          </p>
          <div className="flex w-[250px] h-12 gap-3">
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