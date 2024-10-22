import { ControllerResponseType } from "../@types/ControllerResponseType"
import { CreateUserAccount, LoginType } from "../@types/UserType"
import api from "../services/api"

class AuthController {
  async login(data: LoginType): Promise<ControllerResponseType> {
    try {
      await api.post("/login", data)

      return {
        title: "Sucesso",
        content: "Login realizado com sucesso!",
        type: "success"
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } }

      return {
        title: "Erro ao fazer login",
        content: error.response.data.message,
        type: "error"
      }
    }
  }

  async logout() {

  }

  async createAccount(data: CreateUserAccount): Promise<ControllerResponseType> {
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