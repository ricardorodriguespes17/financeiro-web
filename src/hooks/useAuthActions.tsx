import authController from "../controller/authController"
import useAuthStore from "../store/authStore"
import useNotificationStore from "../store/notificationStore"
import readError from "../utils/readError"

const useAuthActions = () => {
  const { setTokens, refreshToken } = useAuthStore()
  const { setNotification } = useNotificationStore()

  const login = async (data: { email: string, password: string }) => {
    try {
      const response = await authController.login(data)

      setTokens({
        accessToken: response.data.accessToken || null,
        refreshToken: response.data.refreshToken || null
      })
    } catch (err) {
      const notification = readError(err)
      setNotification(notification)
    }
  }

  const logout = async () => {
    authController.logout(refreshToken)

    //nao espera o logout concluir para limpar os tokens
    setTokens({
      accessToken: null,
      refreshToken: null
    })
  }

  const onRefreshToken = async () => {
    if (!refreshToken) {
      return
    }

    const response = await authController.refreshToken(refreshToken)

    setTokens({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken
    })
  }

  return {
    login,
    logout,
    onRefreshToken
  }
}

export default useAuthActions