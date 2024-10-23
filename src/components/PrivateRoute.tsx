import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { useEffect } from 'react'
import ApiService from '../services/ApiService'

const PrivateRoute = () => {
  const { accessToken, refreshToken } = useAuthStore()
  const isAuthenticated = !!accessToken

  useEffect(() => {
    ApiService.setAuthHaader(accessToken)
    if (refreshToken) {
      ApiService.configInterceptor(refreshToken)
    }
  }, [accessToken, refreshToken])

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
