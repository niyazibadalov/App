import { Link } from 'react-router-dom';
import { useAuth } from "../features/auth/AuthContext";

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav style={{ padding: '15px', background: '#2c3e50', display: 'flex', gap: '20px' }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Ana Səhifə</Link>
      {isAuthenticated ? (
        <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard (Qorunan)</Link>
      ) : (
        <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Giriş</Link>
      )}
    </nav>
  );
}