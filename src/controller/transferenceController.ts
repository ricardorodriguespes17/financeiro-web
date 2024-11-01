import { TransferenceCreateType, TransferenceType } from "../@types/TransferenceType"
import ApiService from "../services/ApiService"

class TransferenceController {
  async getTransferences(month: string) {
    return await ApiService.api.get<TransferenceType[]>(`/transferences/${month}`)
  }

  async createTransference(data: TransferenceCreateType) {
    return await ApiService.api.post<TransferenceType>("/transferences", data)
  }

  async updateTransference(transferenceId: string, data: TransferenceCreateType) {
    return await ApiService.api.put<TransferenceType>(`/transferences/${transferenceId}`, data)
  }

  async deleteTransference(transferenceId: string) {
    return await ApiService.api.delete(`/transferences/${transferenceId}`)
  }
}

export default new TransferenceController()