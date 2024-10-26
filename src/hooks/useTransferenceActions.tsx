import { useState } from "react"
import { TransferenceCreateType, TransferenceType } from "../@types/TransferenceType"
import useNotificationStore from "../store/notificationStore"
import useTransferenceStore from "../store/transferenceStore"
import transferenceController from "../controller/transferenceController"
import readError from "../utils/readError"
import useBoardActions from "./useBoardActions"

const useTransferenceActions = () => {
  const transferenceStore = useTransferenceStore()
  const boardStore = useBoardActions()
  const { setNotification } = useNotificationStore()
  const [isLoading, setLoading] = useState(false)

  const loadTransferences = async () => {
    const boardId = boardStore.getCurrentBoard()?.id

    if (!boardId) {
      return
    }

    setLoading(true)
    try {
      const response = await transferenceController.getTransferences(boardId)
      transferenceStore.setTransferences(response.data)
    } catch (error) {
      const notification = readError(error)
      setNotification(notification)
    } finally {
      setLoading(false)
    }
  }

  const getCurrentTransference = () => {
    return transferenceStore.currentTransference
  }

  const setCurrentTransference = (data: Partial<TransferenceType> | null) => {
    if (data !== null) {
      transferenceStore.setCurrentTransference({
        ...data,
        boardId: boardStore.getCurrentBoard()?.id
      })
    } else {
      transferenceStore.setCurrentTransference(null)
    }
  }

  const getAllTransferences = () => {
    return transferenceStore.transferences
  }

  const getExpenses = () => {
    return transferenceStore.getExpenses()
  }

  const getIncomes = () => {
    return transferenceStore.getIncomes()
  }

  const createTransference = async (data: TransferenceCreateType) => {
    setLoading(true)
    try {
      const response = await transferenceController.createTransference(data)
      transferenceStore.addTransference(response.data)
    } catch (error) {
      const notification = readError(error)
      setNotification(notification)
    } finally {
      setLoading(false)
    }
  }

  const updateTransference = async (id: string, data: TransferenceCreateType) => {
    setLoading(true)
    try {
      const response = await transferenceController.updateTransference(id, data)
      transferenceStore.updateTransference(response.data)
    } catch (error) {
      const notification = readError(error)
      setNotification(notification)
    } finally {
      setLoading(false)
    }
  }

  const deleteTransference = async (id: string) => {
    setLoading(true)
    try {
      await transferenceController.deleteTransference(id)
      transferenceStore.deleteTransference(id)
    } catch (error) {
      const notification = readError(error)
      setNotification(notification)
    } finally {
      setLoading(false)
    }
  }

  return {
    loadTransferences,
    getAllTransferences,
    getCurrentTransference,
    setCurrentTransference,
    getExpenses,
    getIncomes,
    createTransference,
    deleteTransference,
    updateTransference,
    isLoading
  }
}

export default useTransferenceActions