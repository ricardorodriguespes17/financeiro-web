import { BoardCreateType, BoardType, BoardUpdateType } from "../@types/BoardType"
import ApiService from "../services/ApiService"

class BoardController {
  async getBoards() {
    return await  ApiService.api.get<BoardType[]>("/boards")
  }

  async getBoardById(boardId: string) {
    return await  ApiService.api.get<BoardType | null>(`/boards/${boardId}`)
  }

  async createBoard(data: BoardCreateType) {
    return await  ApiService.api.post("/boards", data)
  }

  async updateBoard(boardId: string, data: BoardUpdateType) {
    return await  ApiService.api.post(`/boards/${boardId}`, data)
  }

  async deleteBoard(boardId: string) {
    return await  ApiService.api.post(`/boards/${boardId}`)
  }
}

export default new BoardController()