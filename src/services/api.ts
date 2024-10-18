import axios from "axios"

const baseURL = process.env.VITE_API_URL

const api = axios.create({ baseURL })

export default api