import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Features - Auth
import { AuthProvider } from './features/auth/AuthContext';
import ProtectedRoute from './features/auth/ProtectedRoute';
import PublicRoute from './features/auth/PublicRoute'; 
import Login from './features/auth/Login';

// Features - Dashboard & Home
import Dashboard from './features/dashboard/Dashboard';
import Home from './features/home/Home';

// Common Components
import Navbar from './components/Navbar';

// Pages
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Giriş etməyənlər üçün (PublicRoute) */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          
          {/* Yalnız giriş edənlər üçün (ProtectedRoute) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Səhv ünvan yazıldıqda */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}