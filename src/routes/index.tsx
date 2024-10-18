import { BrowserRouter, Route, Routes } from "react-router-dom"
import PublicRoute from "../components/PublicRoute"
import publicRoutes from "./publicRoutes"
import privateRoutes from "./privateRoutes"
import PrivateRoute from "../components/PrivateRoute"
import NotFoundPage from "../pages/NotFound"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route element={<PublicRoute />}>
          {publicRoutes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Route>

        {/* Rotas Privadas */}
        <Route element={<PrivateRoute />}>
          {privateRoutes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes