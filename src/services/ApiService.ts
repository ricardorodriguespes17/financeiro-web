import axios, { AxiosInstance } from "axios"
import useAuthStore from "../store/authStore"

const baseURL = import.meta.env.VITE_API_URL

class ApiService {
  public api: AxiosInstance

  constructor() {
    this.api = axios.create({ baseURL })

    this.setAuthHaader()
  }

  private setAuthHaader() {
    const { accessToken } = useAuthStore.getState()

    if (accessToken) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
    }
  }
}

export default new ApiService().api