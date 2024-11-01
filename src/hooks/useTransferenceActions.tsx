import { TransferenceCreateType, TransferenceType } from "../@types/TransferenceType"
import useNotificationStore from "../store/notificationStore"
import useTransferenceStore from "../store/transferenceStore"
import transferenceController from "../controller/transferenceController"
import readError from "../utils/readError"

const useTransferenceActions = () => {
  const transferenceStore = useTransferenceStore()
  const { setNotification } = useNotificationStore()

  const getCurrentTransference = () => {
    return transferenceStore.currentTransference
  }

  const setCurrentTransference = (data: Partial<TransferenceType> | null) => {
    if (data !== null) {
      transferenceStore.setCurrentTransference(data)
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
    transferenceStore.setLoading(true)
    try {
      const response = await transferenceController.createTransference(data)
      transferenceStore.addTransference(response.data)
    } catch (error) {
      const notification = readError(error)
      setNotification(notification)
    } finally {
      transferenceStore.setLoading(false)
    }
  }

  const updateTransference = async (id: string, data: TransferenceCreateType) => {
    transferenceStore.setLoading(true)
    try {
      const response = await transferenceController.updateTransference(id, data)
      transferenceStore.updateTransference(response.data)
    } catch (error) {
      const notification = readError(error)
      setNotification(notification)
    } finally {
      transferenceStore.setLoading(false)
    }
  }

  const deleteTransference = async (id: string) => {
    transferenceStore.setLoading(true)
    try {
      await transferenceController.deleteTransference(id)
      transferenceStore.deleteTransference(id)
    } catch (error) {
      const notification = readError(error)
      setNotification(notification)
    } finally {
      transferenceStore.setLoading(false)
    }
  }

  const getIsLoading = () => {
    return transferenceStore.isLoading
  }

  return {
    getAllTransferences,
    getCurrentTransference,
    setCurrentTransference,
    getExpenses,
    getIncomes,
    createTransference,
    deleteTransference,
    updateTransference,
    getIsLoading
  }
}

export default useTransferenceActions