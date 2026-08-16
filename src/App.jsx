import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogin = (newToken) => setToken(newToken);
  const handleLogout = () => setToken(null);

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={!!token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        
        <Route element={<ProtectedRoute isAuthenticated={!!token} />}>
          <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}