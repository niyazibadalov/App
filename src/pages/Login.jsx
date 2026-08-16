import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const trimmedUsername = username.trim();

    // 1. İstifadəçi adı validasiyası
    if (!trimmedUsername) {
      newErrors.username = 'İstifadəçi adı boş ola bilməz!';
    } else if (username.includes(' ')) {
      newErrors.username = 'İstifadəçi adında boşluq (space) ola bilməz!';
    } else if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
      newErrors.username = 'İstifadəçi adı 3-20 simvol aralığında olmalıdır!';
    } else if (!/^[a-zA-Z]/.test(trimmedUsername)) {
      newErrors.username = 'İstifadəçi adı mütləq hərf ilə başlamalıdır!';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(trimmedUsername)) {
      newErrors.username = 'İstifadəçi adı yalnız hərf, rəqəm, "_" və "-" simvollarından ibarət ola bilər!';
    }

    // 2. Şifrə validasiyası
    if (!password.trim()) {
      newErrors.password = 'Şifrə boş və ya yalnız boşluqlardan ibarət ola bilməz!';
    } else if (password.length < 6) {
      newErrors.password = 'Şifrə ən az 6 simvol olmalıdır!';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const mockToken = 'mock-jwt-token-12345';
      login(mockToken);
      
      setUsername('');
      setPassword('');
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h1>Giriş Səhifəsi</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <input 
            type="text" 
            placeholder="İstifadəçi adı (məs: user_123)" 
            value={username} 
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) setErrors((prev) => ({ ...prev, username: '' }));
            }} 
            style={{ 
              padding: '8px', 
              width: '100%', 
              boxSizing: 'border-box', 
              borderColor: errors.username ? '#e74c3c' : '#ccc' 
            }}
          />
          {errors.username && (
            <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              {errors.username}
            </span>
          )}
        </div>

        <div>
          <input 
            type="password" 
            placeholder="Şifrə" 
            value={password} 
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
            }} 
            style={{ 
              padding: '8px', 
              width: '100%', 
              boxSizing: 'border-box', 
              borderColor: errors.password ? '#e74c3c' : '#ccc' 
            }}
          />
          {errors.password && (
            <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              {errors.password}
            </span>
          )}
        </div>

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