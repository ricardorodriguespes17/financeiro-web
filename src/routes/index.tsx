import { BrowserRouter, Route, Routes } from "react-router-dom"
import PublicRoute from "../components/PublicRoute"
import publicRoutes from "./publicRoutes"
import privateRoutes from "./privateRoutes"
import PrivateRoute from "../components/PrivateRoute"

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
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes