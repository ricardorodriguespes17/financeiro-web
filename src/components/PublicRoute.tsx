import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
  const isAuthenticated = false

  return isAuthenticated ? <Navigate to="/home" /> : <Outlet />
}

export default PublicRoute
