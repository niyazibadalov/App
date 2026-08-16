import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      const mockToken = 'mock-jwt-token-12345';
      localStorage.setItem('token', mockToken);
      onLogin(mockToken);
      
      // Giriş edildikdən sonra inputları sıfırlayırıq
      setUsername('');
      setPassword('');
      
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h1>Giriş Səhifəsi</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="İstifadəçi adı" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          type="password" 
          placeholder="Şifrə" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <button 
          type="submit" 
          style={{ padding: '10px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Daxil ol
        </button>
      </form>
    </div>
  );
}