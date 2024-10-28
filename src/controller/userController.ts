import { CreateUserAccount, UpdateUserType, UserType } from "../@types/UserType"
import ApiService from "../services/ApiService"

class UserController {
  async getUserData() {
    return await  ApiService.api.get<UserType>(`/users/profile`)
  }

  async createUser(data: CreateUserAccount) {
    return await ApiService.api.post("/users", data)
  }

  async updateUser(data: UpdateUserType) {
    return await  ApiService.api.put<UserType>(`/users`, data)
  }
}

export default new UserController()