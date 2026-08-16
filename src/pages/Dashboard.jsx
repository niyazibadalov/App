import { useNavigate } from 'react-router-dom';

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    // localStorage-dakı bütün məlumatları (token, istifadəçi adı və s.) tamamilə təmizləyirik
    localStorage.clear();
    onLogout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard (Qorunan Səhifə)</h1>
      <p>Sessiyanız aktivdir və token `localStorage`-da saxlanılır.</p>
      <button 
        onClick={handleLogoutClick} 
        style={{ padding: '10px 20px', cursor: 'pointer', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px' }}
      >
        Çıxış et
      </button>
    </div>
  );
}