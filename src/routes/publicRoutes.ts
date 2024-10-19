import { RouteProps } from "react-router-dom"
import HomePage from "../pages/Home"
import RegisterPage from "../pages/Register"
import LoginPage from "../pages/Login"

const publicRoutes: RouteProps[] = [
  {
    path: "/",
    Component: HomePage
  },
  {
    path: "/register",
    Component: RegisterPage
  },
  {
    path: "/login",
    Component: LoginPage
  }
]

export default publicRoutes