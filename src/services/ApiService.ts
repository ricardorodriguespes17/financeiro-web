import axios, { AxiosError } from "axios"
import authController from "../controller/authController"
import useAuthStore from "../store/authStore"

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
      if (error.response.data.message) {
        const { refreshToken } = useAuthStore.getState()
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
            failedRequestsQueue.forEach((req) => req.reject(refreshError as AxiosError))
            failedRequestsQueue = []

            await authController.logout(refreshToken)
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
      } else {
        await authController.logout(null)
      }
    }

    return Promise.reject(error)
  }
  )
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