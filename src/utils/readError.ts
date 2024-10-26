import { NotificationType } from "../@types/NotificationType"

const readError = (err: unknown): NotificationType => {
  const error = err as { response: { data: { message: string } } }

  return {
    title: "Erro",
    content: error.response?.data.message,
    type: "error"
  }
}

export default readError