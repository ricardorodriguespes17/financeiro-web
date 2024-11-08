/* eslint-disable react-hooks/exhaustive-deps */
import useNotificationStore from "../store/notificationStore"
import readError from "../utils/readError"
import { useCallback, useMemo } from "react"
import useTransferenceStore from "../store/transferenceStore"
import installmentController from "../controller/installmentController"
import { InstallmentCreateType, InstallmentType } from "../@types/InstallmentType"

const useInstallmentActions = () => {
  const { setLoading, setTransferences, transferences, isLoading } = useTransferenceStore()
  const { setNotification } = useNotificationStore()

  const createInstallment = useCallback(
    async (data: InstallmentCreateType) => {
      setLoading(true)
      try {
        const response = await installmentController.createInstallment(data)
        addTransferenceInstallment(response.data)
      } catch (error) {
        setNotification(readError(error))
      } finally {
        setLoading(false)
      }
    }, []
  )

  const deleteInstallment = useCallback(
    async (id: string) => {
      setLoading(true)
      try {
        await installmentController.deleteInstallment(id)
        removeTransferenceInstallment(id)
      } catch (error) {
        setNotification(readError(error))
      } finally {
        setLoading(false)
      }
    }, []
  )

  const addTransferenceInstallment = (installmentData: InstallmentType) => {
    setTransferences(
      transferences.map(item => {
        if (installmentData.transferenceId === item.id) {
          return {
            ...item,
            installments: item.installments.concat(installmentData)
          }
        }

        return item
      })
    )
  }

  const removeTransferenceInstallment = (installmentId: string) => {
    setTransferences(
      transferences.map(transference => {
        return {
          ...transference,
          installments: transference.installments.filter(item => item.id !== installmentId)
        }
      })
    )
  }

  const memoizedIsLoading = useMemo(() => isLoading, [isLoading])

  return {
    createInstallment,
    deleteInstallment,
    isLoading: memoizedIsLoading
  }
}

export default useInstallmentActions