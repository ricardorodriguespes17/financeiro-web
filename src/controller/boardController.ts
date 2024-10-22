import { BoardCreateType, BoardType, BoardUpdateType } from "../@types/BoardType"
import ApiService from "../services/ApiService"

class BoardController {
  async getBoards() {
    return await ApiService.get<BoardType[]>("/boards")
  }

  async getBoardById(boardId: string) {
    return await ApiService.get<BoardType | null>(`/boards/${boardId}`)
  }

  async createBoard(data: BoardCreateType) {
    return await ApiService.post("/boards", data)
  }

  async updateBoard(boardId: string, data: BoardUpdateType) {
    return await ApiService.post(`/boards/${boardId}`, data)
  }

  async deleteBoard(boardId: string) {
    return await ApiService.post(`/boards/${boardId}`)
  }
}

export default new BoardController()