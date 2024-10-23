import { ControllerResponseType } from "../@types/ControllerResponseType"
import { CreateUserAccount, LoginType } from "../@types/UserType"
import ApiService from "../services/ApiService"
import useAuthStore from "../store/authStore"

class AuthController {
  async login(data: LoginType): Promise<ControllerResponseType> {
    const { setTokens } = useAuthStore.getState()

    try {
      const response = await ApiService.api.post("/login", data)

      setTokens({
        accessToken: response.data.accessToken || null,
        refreshToken: response.data.refreshToken || null
      })

      return {
        title: "Sucesso",
        content: "Login realizado com sucesso!",
        type: "success",
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } }

      return {
        title: "Erro ao fazer login",
        content: error.response.data.message,
        type: "error",
      }
    }
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

  async refreshToken(data: { refreshToken: string }) {

    try {
      const response = await ApiService.api.post("/auth/refresh", data)

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