import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { useEffect } from 'react'
import ApiService from '../services/ApiService'

const PrivateRoute = () => {
  const { accessToken } = useAuthStore()
  const isAuthenticated = !!accessToken

  useEffect(() => {
    ApiService.setAuthHeader(accessToken)
  }, [accessToken])

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
