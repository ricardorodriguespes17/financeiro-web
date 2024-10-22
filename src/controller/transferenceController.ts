import { ControllerResponseType } from "../@types/ControllerResponseType"
import { TransferenceCreateType, TransferenceType } from "../@types/TransferenceType"
import ApiService from "../services/ApiService"

class TransferenceController {
  async getTransferences(boardId: string) {
    return await  ApiService.api.get<TransferenceType[]>(`/transferences/${boardId}`)
  }

  async createTransference(data: TransferenceCreateType): Promise<ControllerResponseType> {
    try {
      const response = await  ApiService.api.post("/transferences", data)

      return {
        title: "Sucesso",
        content: response.data.message,
        type: "success"
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } }

      return {
        title: "Erro ao criar a transferência",
        content: error.response.data.message,
        type: "error"
      }
    }
  }

  async updateTransference(transferenceId: string, data: TransferenceCreateType): Promise<ControllerResponseType> {
    try {
      const response = await  ApiService.api.put(`/transferences/${transferenceId}`, data)

      return {
        title: "Sucesso",
        content: response.data.message,
        type: "success"
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } }

      return {
        title: "Erro ao atualizar a tranferência",
        content: error.response.data.message,
        type: "error"
      }
    }
  }

  async deleteTransference(transferenceId: string): Promise<ControllerResponseType> {

    try {
      const response = await  ApiService.api.delete(`/transferences/${transferenceId}`)

      return {
        title: "Sucesso",
        content: response.data.message,
        type: "success"
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } }

      return {
        title: "Erro ao deletar a tranferência",
        content: error.response.data.message,
        type: "error"
      }
    }
  }
}

export default new TransferenceController()