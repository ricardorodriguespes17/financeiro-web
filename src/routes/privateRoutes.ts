import { RouteProps } from "react-router-dom"
import DashboardPage from "../pages/Dashboard"

const privateRoutes: RouteProps[] = [
  {
    path: "/dashboard",
    Component: DashboardPage
  }
]

export default privateRoutes