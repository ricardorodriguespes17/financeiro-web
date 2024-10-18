import { RouteProps } from "react-router-dom"
import HomePage from "../pages/Home"
import RegisterPage from "../pages/Register"

const publicRoutes: RouteProps[] = [
  {
    path: "/",
    Component: HomePage
  },
  {
    path: "/register",
    Component: RegisterPage
  }
]

export default publicRoutes