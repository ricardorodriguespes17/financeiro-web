import { InstallmentCreateType, InstallmentType } from "../@types/InstallmentType"
import ApiService from "../services/ApiService"

class InstallmentController {
  async createInstallment(data: InstallmentCreateType) {
    return await ApiService.api.post<InstallmentType>("/transferences/installment", data)
  }

  async deleteInstallment(installmentId: string) {
    return await ApiService.api.delete(`/transferences/installment/${installmentId}`)
  }
}

export default new InstallmentController()