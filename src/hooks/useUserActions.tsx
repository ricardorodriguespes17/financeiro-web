import { CreateUserAccount, UpdateUserType } from "../@types/UserType"
import userController from "../controller/userController"
import useNotificationStore from "../store/notificationStore"
import useUserStore from "../store/userStore"
import readError from "../utils/readError"

const useUserActions = () => {
  const { setNotification } = useNotificationStore()
  const { setUser } = useUserStore()

  const getUserData = async () => {
    try {
      const response = await userController.getUserData()
      setUser(response.data)
    } catch (err) {
      const notification = readError(err)
      setNotification(notification)
      setUser(null)
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
    try {
      const response = await userController.updateUser(data)
      setUser(response.data)
      return true
    } catch (err) {
      const notification = readError(err)
      setNotification(notification)
      return false
    }
  }

  return {
    getUserData,
    createUser,
    updateUser
  }
}

export default useUserActions