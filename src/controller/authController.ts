import { CreateUserAccount } from "../@types/UserType"
import api from "../services/api"

class AuthController {
  async login() {

  }

  async logout() {

  }

  async createAccount(data: CreateUserAccount) {
    try {
      const response = await api.post("/users", data)

      return {
        title: "Sucesso",
        content: response.data.message,
        type: "success"
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } }

      return {
        title: "Erro ao criar conta",
        content: error.response.data.message,
        type: "error"
      }
    }
  }
}

export default new AuthController()