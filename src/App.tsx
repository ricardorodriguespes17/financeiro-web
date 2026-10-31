import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getToken } from './lib/api';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HealthPage from './pages/HealthPage';

// Sem token na sessão, o acesso a rotas protegidas vai para o login.
function RequireAuth({ children }: { children: ReactNode }) {
  if (getToken() === null) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <HealthPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
