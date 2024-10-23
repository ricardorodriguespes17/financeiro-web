import axios, { AxiosInstance } from "axios"
import authController from "../controller/authController"

const baseURL = import.meta.env.VITE_API_URL

class ApiService {
  public api: AxiosInstance
  private isRefreshing: boolean = false

  constructor() {
    this.api = axios.create({ baseURL })
  }

  public configInterceptor(refreshToken: string) {
    this.api.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        const originalRequest = error.config

        if (error.response.status === 403 && refreshToken && !originalRequest._retry) {
          if (!this.isRefreshing) {
            originalRequest._retry = true
            this.isRefreshing = true

            try {
              const newAccessToken = await authController.refreshToken({ refreshToken })

              this.api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`
              return this.api(originalRequest)
            } catch (refreshError) {
              return Promise.reject(refreshError)
            } finally {
              this.isRefreshing = false
            }
          }
        }

        return Promise.reject(error)
      }
    )
  }

  public setAuthHaader(accessToken: string | null) {
    if (accessToken) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
    } else {
      delete this.api.defaults.headers.common["Authorization"]
    }
  }
}

export default new ApiService()