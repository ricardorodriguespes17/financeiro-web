import { RouteProps } from "react-router-dom"
import DashboardPage from "../pages/Dashboard"
import ProfilePage from "../pages/Profile"
import BoardsPage from "../pages/Boards"

const privateRoutes: RouteProps[] = [
  {
    path: "/dashboard",
    Component: DashboardPage
  },
  {
    path: "/profile",
    Component: ProfilePage
  },
  {
    path: "/boards",
    Component: BoardsPage
  }
]

export default privateRoutes