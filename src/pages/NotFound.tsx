import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <h1>Página não encontrada</h1>

      <Link to="/">Voltar para página inicial</Link>
    </div>
  )
}

export default NotFoundPage