import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Features - Auth
import { AuthProvider } from './features/auth/AuthContext';
import ProtectedRoute from './features/auth/ProtectedRoute';
import PublicRoute from './features/auth/PublicRoute'; // Yeni əlavə olunan Guest Guard
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
          
          {/* PublicRoute ilə əhatə olundu ki, login olmuş adam təzədən /login-ə girə bilməsin */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}