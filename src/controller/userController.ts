import { UpdateUserType, UserType } from "../@types/UserType"
import ApiService from "../services/ApiService"

class UserController {
  async getUserById(userId: string) {
    return await  ApiService.api.get<UserType | null>(`/users/${userId}`)
  }

  async updateUser(userId: string, data: UpdateUserType) {
    return await  ApiService.api.post(`/users/${userId}`, data)
  }
}

export default new UserController()