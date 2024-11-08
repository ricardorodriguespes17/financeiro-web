/* eslint-disable react-hooks/exhaustive-deps */
import useNotificationStore from "../store/notificationStore"
import readError from "../utils/readError"
import { useCallback, useMemo } from "react"
import useTransferenceStore from "../store/transferenceStore"
import installmentController from "../controller/installmentController"
import { InstallmentCreateType } from "../@types/InstallmentType"
import useTransferenceActions from "./useTransferenceActions"
import useMonth from "../store/monthStore"

const useInstallmentActions = () => {
  const { setLoading, isLoading } = useTransferenceStore()
  const { loadTransferences } = useTransferenceActions()
  const { setNotification } = useNotificationStore()
  const { monthDate } = useMonth()

  const createInstallment = useCallback(
    async (data: InstallmentCreateType) => {
      setLoading(true)
      try {
        await installmentController.createInstallment(data)
        loadTransferences(monthDate)
      } catch (error) {
        setNotification(readError(error))
      } finally {
        setLoading(false)
      }
    }, [monthDate]
  )

  const deleteInstallment = useCallback(
    async (id: string) => {
      setLoading(true)
      try {
        await installmentController.deleteInstallment(id)
        loadTransferences(monthDate)
      } catch (error) {
        setNotification(readError(error))
      } finally {
        setLoading(false)
      }
    }, []
  )

  const memoizedIsLoading = useMemo(() => isLoading, [isLoading])

  return {
    createInstallment,
    deleteInstallment,
    isLoading: memoizedIsLoading
  }
}

export default useInstallmentActions