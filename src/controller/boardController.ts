import { BoardCreateType, BoardType, BoardUpdateType } from "../@types/BoardType"
import ApiService from "../services/ApiService"

class BoardController {
  async getBoards() {
    return await ApiService.api.get<BoardType[]>("/boards")
  }

  async getBoardById(boardId: string) {
    return await ApiService.api.get<BoardType | null>(`/boards/${boardId}`)
  }

  async getBoardByName(boardName: string) {
    return await ApiService.api.get<BoardType | null>(`/boards/name/${boardName}`)
  }

  async createBoard(data: BoardCreateType) {
    try {
      const response = await ApiService.api.post("/boards", data)

      return {
        title: "Sucesso",
        content: response.data.message,
        type: "success"
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } }

      return {
        title: "Erro ao criar um quadro",
        content: error.response.data.message,
        type: "error"
      }
    }
  }

  async updateBoard(boardId: string, data: BoardUpdateType) {
    return await ApiService.api.post(`/boards/${boardId}`, data)
  }

  async deleteBoard(boardId: string) {
    return await ApiService.api.post(`/boards/${boardId}`)
  }
}

export default new BoardController()