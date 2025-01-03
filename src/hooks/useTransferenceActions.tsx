/* eslint-disable react-hooks/exhaustive-deps */
import { TransferenceCreateType } from "../@types/TransferenceType"
import useNotificationStore from "../store/notificationStore"
import useTransferenceStore from "../store/transferenceStore"
import transferenceController from "../controller/transferenceController"
import readError from "../utils/readError"
import { useCallback, useMemo } from "react"
import useMonth from "../store/monthStore"

const useTransferenceActions = () => {
  const {
    transferences,
    currentTransference,
    setCurrentTransference,
    getExpenses,
    getIncomes,
    isLoading,
    setLoading,
    addTransference,
    deleteTransference: delTransference,
    updateTransference: update,
    setTransferences
  } = useTransferenceStore()
  const { setNotification } = useNotificationStore()
  const { monthDate } = useMonth()

  const loadTransferences = useCallback(
    async (month: string) => {
      setLoading(true)
      try {
        const response = await transferenceController.getTransferences(month)
        setTransferences(response.data)
      } catch (error) {
        setNotification(readError(error))
      } finally {
        setLoading(false)
      }
    }, []
  )

  const createTransference = useCallback(
    async (data: TransferenceCreateType) => {
      setLoading(true)
      try {
        const response = await transferenceController.createTransference(data)
        addTransference(response.data)
      } catch (error) {
        setNotification(readError(error))
      } finally {
        setLoading(false)
      }
    }, []
  )

  const updateTransference = useCallback(
    async (id: string, data: TransferenceCreateType) => {
      setLoading(true)
      try {
        const response = await transferenceController.updateTransference(id, data)
        update(response.data)
      } catch (error) {
        setNotification(readError(error))
      } finally {
        setLoading(false)
      }
    }, []
  )

  const deleteTransference = useCallback(
    async (id: string) => {
      setLoading(true)
      try {
        await transferenceController.deleteTransference(id)
        delTransference(id)
      } catch (error) {
        setNotification(readError(error))
      } finally {
        setLoading(false)
      }
    }, []
  )

  const memoizedTransferences = useMemo(() =>
    transferences.sort((a, b) => {
      const isPaidA = !!a.installments.find(item => item.dueMonth === monthDate)
      const isPaidB = !!b.installments.find(item => item.dueMonth === monthDate)

      if(isPaidA && !isPaidB) {
        return 1
      }

      if(isPaidA === isPaidB) {
        return a.expireDay - b.expireDay
      }
      
      return -1
    })
    , [transferences])
  const memoizedCurrentTransference = useMemo(() => currentTransference, [currentTransference])
  const memoizedIsLoading = useMemo(() => isLoading, [isLoading])

  return {
    loadTransferences,
    transferences: memoizedTransferences,
    currentTransference: memoizedCurrentTransference,
    setCurrentTransference,
    getExpenses,
    getIncomes,
    createTransference,
    deleteTransference,
    updateTransference,
    isLoading: memoizedIsLoading,
  }
}

export default useTransferenceActions