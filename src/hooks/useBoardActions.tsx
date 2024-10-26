import { useState } from "react"
import useNotificationStore from "../store/notificationStore"
import readError from "../utils/readError"
import { BoardCreateType, BoardUpdateType } from "../@types/BoardType"
import boardController from "../controller/boardController"
import useBoardStore from "../store/boardStore"

const useBoardActions = () => {
  const boardStore  = useBoardStore()
  const { setNotification } = useNotificationStore()
  const [isLoading, setLoading] = useState(false)

  const loadBoards = async () => {
    if(boardStore.boards.length > 0) {
      return
    }

    setLoading(true)
    try {
      const response = await boardController.getBoards()
      boardStore.setBoards(response.data)
    } catch (error) {
      const notification = readError(error)
      setNotification(notification)
    } finally {
      setLoading(false)
    }
  }

  const getAllBoards = () => {
    return boardStore.boards
  }

  const getCurrentBoard = () => {
    return boardStore.currentBoard
  }

  const setCurrentBoard = (name: string) => {
    const board = getAllBoards().find(item => item.name === name) || null

    return boardStore.setCurrentBoard(board)
  }

  const createBoard = async (data: BoardCreateType) => {
    setLoading(true)
    try {
      const response = await boardController.createBoard(data)
      boardStore.addBoard(response.data)
    } catch (error) {
      const notification = readError(error)
      setNotification(notification)
    } finally {
      setLoading(false)
    }
  }

  const updateBoard = async (id: string, data: BoardUpdateType) => {
    setLoading(true)
    try {
      const response = await boardController.updateBoard(id, data)
      boardStore.updateBoard(response.data)
    } catch (error) {
      const notification = readError(error)
      setNotification(notification)
    } finally {
      setLoading(false)
    }
  }

  const deleteBoard = async (id: string) => {
    setLoading(true)
    try {
      await boardController.deleteBoard(id)
      boardStore.deleteBoard(id)
    } catch (error) {
      const notification = readError(error)
      setNotification(notification)
    } finally {
      setLoading(false)
    }
  }

  return {
    loadBoards,
    getAllBoards,
    getCurrentBoard,
    setCurrentBoard,
    createBoard,
    deleteBoard,
    updateBoard,
    isLoading
  }
}

export default useBoardActions