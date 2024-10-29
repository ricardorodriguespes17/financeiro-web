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
    return await ApiService.api.post<BoardType>("/boards", data)
  }

  async updateBoard(boardId: string, data: BoardUpdateType) {
    return await ApiService.api.put<BoardType>(`/boards/${boardId}`, data)
  }

  async deleteBoard(boardId: string) {
    return await ApiService.api.delete(`/boards/${boardId}`)
  }
}

export default new BoardController()