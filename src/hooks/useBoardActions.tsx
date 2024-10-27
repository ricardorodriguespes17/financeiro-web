import useNotificationStore from "../store/notificationStore"
import readError from "../utils/readError"
import { BoardCreateType, BoardUpdateType } from "../@types/BoardType"
import boardController from "../controller/boardController"
import useBoardStore from "../store/boardStore"
import useMonth from "../store/monthStore"
import { useEffect } from "react"

const useBoardActions = () => {
  const boardStore = useBoardStore()
  const { setNotification } = useNotificationStore()
  const { monthDate } = useMonth()

  useEffect(() => {
    setCurrentBoard()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthDate, boardStore.boards])

  const loadBoards = async () => {
    boardStore.setIsLoading(true)
    try {
      const response = await boardController.getBoards()
      boardStore.setBoards(response.data)
      setCurrentBoard()
    } catch (error) {
      const notification = readError(error)
      setNotification(notification)
    } finally {
      boardStore.setIsLoading(false)
    }
  }

  const getAllBoards = () => {
    return boardStore.boards
  }

  const getCurrentBoard = () => {
    return boardStore.currentBoard
  }

  const setCurrentBoard = () => {
    const board = getAllBoards().find(item => item.name === monthDate) || null

    return boardStore.setCurrentBoard(board)
  }

  const createBoard = async (data: BoardCreateType) => {
    boardStore.setIsLoading(true)
    try {
      const response = await boardController.createBoard(data)
      boardStore.addBoard(response.data)
      boardStore.setCurrentBoard(response.data)
    } catch (error) {
      const notification = readError(error)
      setNotification(notification)
    } finally {
      boardStore.setIsLoading(false)
    }
  }

  const updateBoard = async (id: string, data: BoardUpdateType) => {
    boardStore.setIsLoading(true)
    try {
      const response = await boardController.updateBoard(id, data)
      boardStore.updateBoard(response.data)
    } catch (error) {
      const notification = readError(error)
      setNotification(notification)
    } finally {
      boardStore.setIsLoading(false)
    }
  }

  const deleteBoard = async (id: string) => {
    boardStore.setIsLoading(true)
    try {
      await boardController.deleteBoard(id)
      boardStore.deleteBoard(id)
    } catch (error) {
      const notification = readError(error)
      setNotification(notification)
    } finally {
      boardStore.setIsLoading(false)
    }
  }

  const getIsLoading = () => {
    return boardStore.isLoading
  }

  return {
    loadBoards,
    getAllBoards,
    getCurrentBoard,
    setCurrentBoard,
    createBoard,
    deleteBoard,
    updateBoard,
    getIsLoading
  }
}

export default useBoardActions