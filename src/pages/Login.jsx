import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    onLogin();
    navigate('/dashboard'); // Giriş edən kimi avtomatik Dashboard-a atır
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Giriş Səhifəsi</h1>
      <button 
        onClick={handleLoginClick} 
        style={{ padding: '10px 20px', cursor: 'pointer', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px' }}
      >
        Daxil ol (Mock Login)
      </button>
    </div>
  );
}