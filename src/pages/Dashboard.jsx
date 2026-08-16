import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard (Qorunan Səhifə)</h1>
      <p>Sessiyanız Context + Reducer üzərindən idarə olunur.</p>
      <button 
        onClick={handleLogoutClick} 
        style={{ padding: '10px 20px', cursor: 'pointer', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px' }}
      >
        Çıxış et
      </button>
    </div>
  );
}