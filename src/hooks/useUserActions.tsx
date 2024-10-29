import { useState } from "react"
import { CreateUserAccount, UpdateUserType } from "../@types/UserType"
import userController from "../controller/userController"
import useNotificationStore from "../store/notificationStore"
import useUserStore from "../store/userStore"
import readError from "../utils/readError"

const useUserActions = () => {
  const { setNotification } = useNotificationStore()
  const { setUser, user } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)

  const getUser = () => {
    return user
  }

  const getUserData = async () => {
    setIsLoading(true)
    try {
      const response = await userController.getUserData()
      setUser(response.data)
    } catch (err) {
      const notification = readError(err)
      setNotification(notification)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const createUser = async (data: CreateUserAccount) => {
    try {
      await userController.createUser(data)
      return true
    } catch (err) {
      const notification = readError(err)
      setNotification(notification)
      return false
    }
  }

  const updateUser = async (data: UpdateUserType) => {
    setIsLoading(true)
    try {
      const response = await userController.updateUser(data)
      setUser(response.data)
      return true
    } catch (err) {
      const notification = readError(err)
      setNotification(notification)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getUser,
    getUserData,
    createUser,
    updateUser,
    isLoading
  }
}

export default useUserActions