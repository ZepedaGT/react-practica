// src/App.tsx
import type { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './layouts/Headers';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';

// Layout con Header para páginas autenticadas
function AppLayout({ children }: { children: ReactNode }) {
   const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Header user={user ?? undefined} onLogout={handleLogout} />
      <main>{children}</main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/empleados" element={
          <ProtectedRoute>
            <AppLayout>
              <EmployeesPage />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/empleados/:id" element={
          <ProtectedRoute>
            <AppLayout>
              <EmployeeDetailPage />
            </AppLayout>
          </ProtectedRoute>
        } />

        {/* La raíz siempre debe abrir la pantalla de login */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;