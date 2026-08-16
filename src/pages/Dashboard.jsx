import { useNavigate } from 'react-router-dom';

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login'); // Çıxış edən kimi avtomatik Login-ə atır
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard (Qorunan Səhifə)</h1>
      <p>Təbrik edirik! Bu səhifəni yalnız daxil olmuş istifadəçilər görə bilər.</p>
      <button 
        onClick={handleLogoutClick} 
        style={{ padding: '10px 20px', cursor: 'pointer', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px' }}
      >
        Çıxış et
      </button>
    </div>
  );
}