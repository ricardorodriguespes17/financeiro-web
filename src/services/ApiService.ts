import axios, { AxiosError, AxiosInstance } from "axios"
import authController from "../controller/authController"

const baseURL = import.meta.env.VITE_API_URL

type FailedRequestType = {
  resolve: (accessToken: string | null) => void
  reject: (err: AxiosError) => void
}

class ApiService {
  public api: AxiosInstance
  private isRefreshing: boolean = false
  private failedRequestsQueue: FailedRequestType[] = []

  constructor() {
    this.api = axios.create({ baseURL })
  }

  public configInterceptor(refreshToken: string) {
    this.api.interceptors.response.use((response) => {
      return response
    }, async (error) => {
      const originalRequest = error.config
      
      if (error.response.status === 401 && !originalRequest._retry) {
        if (error.response.data.message) {
          if (!this.isRefreshing) {
            originalRequest._retry = true
            this.isRefreshing = true
            
            try {
              const { accessToken } = await authController.refreshToken({ refreshToken })
              
              this.setAuthHeader(accessToken)

              this.failedRequestsQueue.forEach((req) => req.resolve(accessToken))
              this.failedRequestsQueue = []
            } catch (refreshError) {
              console.log("error")
              this.failedRequestsQueue.forEach((req) => req.reject(refreshError as AxiosError))
              this.failedRequestsQueue = []

              authController.logout()
            } finally {
              this.isRefreshing = false
            }
          }

          return new Promise((resolve, reject) => {
            this.failedRequestsQueue.push({
              resolve: (accessToken: string | null) => {
                originalRequest.headers["Authorization"] = accessToken
                console.log(originalRequest)
                resolve(this.api(originalRequest))
              },
              reject: (err: AxiosError) => {
                reject(err)
              },
            })
          })
        } else {
          authController.logout()
        }
      }

      return Promise.reject(error)
    }
    )
  }

  public setAuthHeader(accessToken: string | null) {
    if (accessToken) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
    } else {
      delete this.api.defaults.headers.common["Authorization"]
    }
  }
}

export default new ApiService()