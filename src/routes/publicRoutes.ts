import { RouteProps } from "react-router-dom"
import HomePage from "../pages/Home"

const publicRoutes: RouteProps[] = [
  {
    path: "/",
    Component: HomePage
  }
]

export default publicRoutes