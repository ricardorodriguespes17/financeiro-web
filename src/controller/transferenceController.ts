import { TransferenceCreateType, TransferenceType } from "../@types/TransferenceType"
import ApiService from "../services/ApiService"

class TransferenceController {
  async getTransferences(boardId: string) {
    return await ApiService.get<TransferenceType[]>(`/transferences/${boardId}`)
  }

  async createTransference(data: TransferenceCreateType) {
    return await ApiService.post("/transferences", data)
  }

  async updateTransference(transferenceId: string, data: TransferenceCreateType) {
    return await ApiService.post(`/transferences/${transferenceId}`, data)
  }

  async deleteTransference(transferenceId: string) {
    return await ApiService.post(`/transferences/${transferenceId}`)
  }
}

export default new TransferenceController()