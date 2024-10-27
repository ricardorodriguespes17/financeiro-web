import { ControllerResponseType } from "../@types/ControllerResponseType"
import { CreateUserAccount, LoginType } from "../@types/UserType"
import ApiService from "../services/ApiService"

class AuthController {
  async login(data: LoginType) {
    return await ApiService.api.post("/auth/login", data)
  }

  async logout(refreshToken: string | null) {
    return await ApiService.api.post("/auth/logout", { refreshToken })
  }

  async createAccount(data: CreateUserAccount): Promise<ControllerResponseType> {
    try {
      const response = await ApiService.api.post("/users", data)

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

  async refreshToken(refreshToken: string) {
    return await ApiService.api.post("/auth/refresh", { refreshToken })
  }
}

export default new AuthController()