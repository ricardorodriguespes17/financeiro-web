import axios, { AxiosInstance } from "axios"

const baseURL = import.meta.env.VITE_API_URL

class ApiService {
  public api: AxiosInstance

  constructor() {
    this.api = axios.create({ baseURL })
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