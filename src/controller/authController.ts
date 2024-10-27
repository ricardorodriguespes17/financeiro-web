import { LoginType } from "../@types/UserType"
import ApiService from "../services/ApiService"

class AuthController {
  async login(data: LoginType) {
    return await ApiService.api.post("/auth/login", data)
  }

  async logout(refreshToken: string | null) {
    return await ApiService.api.post("/auth/logout", { refreshToken })
  }

  async refreshToken(refreshToken: string) {
    return await ApiService.api.post("/auth/refresh", { refreshToken })
  }
}

export default new AuthController()