import { InstallmentCreateType, InstallmentType } from "../@types/InstallmentType"
import ApiService from "../services/ApiService"

class InstallmentController {
  async createTransference(data: InstallmentCreateType) {
    return await ApiService.api.post<InstallmentType>("/transferences/installment", data)
  }

  async deleteTransference(transferenceId: string) {
    return await ApiService.api.delete(`/transferences/installment/${transferenceId}`)
  }
}

export default new InstallmentController()