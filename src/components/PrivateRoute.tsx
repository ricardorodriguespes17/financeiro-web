import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const PrivateRoute = () => {
  const { accessToken } = useAuthStore()
  const isAuthenticated = !!accessToken

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
