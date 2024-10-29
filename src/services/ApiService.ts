import axios, { AxiosError } from "axios"
import authController from "../controller/authController"
import useAuthStore from "../store/authStore"
import useAuthActions from "../hooks/useAuthActions"

const baseURL = import.meta.env.VITE_API_URL

type FailedRequestType = {
  resolve: (accessToken: string | null) => void
  reject: (err: AxiosError) => void
}

const api = axios.create({ baseURL })
let isRefreshing: boolean = false
let failedRequestsQueue: FailedRequestType[] = []

const configInterceptor = () => {
  api.interceptors.response.use((response) => {
    return response
  }, async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      const { refreshToken, accessToken } = useAuthStore.getState()

      if(error.response.data.message === "Token não enviado") {
        setAuthHeader(accessToken)
        return await api(originalRequest)
      }

      if (!isRefreshing && refreshToken) {
        originalRequest._retry = true
        isRefreshing = true

        try {
          const response = await authController.refreshToken(refreshToken)
          const accessToken = response.data.accessToken

          setAuthHeader(accessToken)

          failedRequestsQueue.forEach((req) => req.resolve(accessToken))
          failedRequestsQueue = []

          return await api(originalRequest)
        } catch (refreshError) {
          const error = refreshError as AxiosError

          failedRequestsQueue.forEach((req) => req.reject(error))
          failedRequestsQueue = []

          if (error.status === 401) {
            const { logout } = useAuthActions()
            await logout()
          }
        } finally {
          isRefreshing = false
        }
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          resolve: (accessToken: string | null) => {
            originalRequest.headers["Authorization"] = accessToken
            resolve(api(originalRequest))
          },
          reject: (err: AxiosError) => {
            reject(err)
          },
        })
      })
    }

    return Promise.reject(error)
  })
}

configInterceptor()

const setAuthHeader = (accessToken: string | null) => {
  if (accessToken) {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  } else {
    delete api.defaults.headers.common["Authorization"]
  }
}

export default {
  setAuthHeader,
  api
}