import { useState } from "react"
import { TransferenceCreateType } from "../@types/TransferenceType"
import useNotificationStore from "../store/notificationStore"
import useTransferenceStore from "../store/transferenceStore"
import transferenceController from "../controller/transferenceController"
import readError from "../utils/readError"

const useTransferenceActions = () => {
  const transferenceStore = useTransferenceStore()
  const { setNotification } = useNotificationStore()
  const [loading, setLoading] = useState(false)

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

  return { createTransference, deleteTransference, updateTransference, loading }
}

export default useTransferenceActions