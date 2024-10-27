import { CreateUserAccount, UpdateUserType } from "../@types/UserType"
import userController from "../controller/userController"
import useNotificationStore from "../store/notificationStore"
import readError from "../utils/readError"

const useUserActions = () => {
  const { setNotification } = useNotificationStore()

  const getUserById = async (userId: string) => {
    try {
      const response = await userController.getUserById(userId)
      return response.data
    } catch (err) {
      const notification = readError(err)
      setNotification(notification)
      return null
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

  const updateUser = async (id: string, data: UpdateUserType) => {
    try {
      await userController.updateUser(id, data)
    } catch (err) {
      const notification = readError(err)
      setNotification(notification)
    }
  }

  return {
    getUserById,
    createUser,
    updateUser
  }
}

export default useUserActions