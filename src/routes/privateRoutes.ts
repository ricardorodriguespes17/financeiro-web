import { RouteProps } from "react-router-dom"
import DashboardPage from "../pages/Dashboard"
import ProfilePage from "../pages/Profile"

const privateRoutes: RouteProps[] = [
  {
    path: "/dashboard",
    Component: DashboardPage
  },
  {
    path: "/profile",
    Component: ProfilePage
  }
]

export default privateRoutes