import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const PublicRoute = () => {
  const { accessToken } = useAuthStore()
  const isAuthenticated = !!accessToken

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />
}

export default PublicRoute
