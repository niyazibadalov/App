import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const mockToken = 'mock-jwt-token-12345';
    login(mockToken);
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h1>Giriş Səhifəsi</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* İstifadəçi adı */}
        <div>
          <input 
            type="text" 
            placeholder="İstifadəçi adı (məs: user_123)" 
            {...register("username", {
              required: 'İstifadəçi adı boş ola bilməz!',
              validate: {
                noSpace: (value) => !value.includes(' ') || 'İstifadəçi adında boşluq (space) ola bilməz!',
                lengthCheck: (value) => {
                  const trimmed = value.trim();
                  return (trimmed.length >= 3 && trimmed.length <= 20) || 'İstifadəçi adı 3-20 simvol aralığında olmalıdır!';
                },
                startsWithLetter: (value) => /^[a-zA-Z]/.test(value.trim()) || 'İstifadəçi adı mütləq hərf ilə başlamalıdır!',
                validChars: (value) => /^[a-zA-Z0-9_-]+$/.test(value.trim()) || 'İstifadəçi adı yalnız hərf, rəqəm, "_" və "-" simvollarından ibarət ola bilər!'
              }
            })}
            style={{ 
              padding: '8px', 
              width: '100%', 
              boxSizing: 'border-box', 
              borderColor: errors.username ? '#e74c3c' : '#ccc' 
            }}
          />
          {errors.username && (
            <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              {errors.username.message}
            </span>
          )}
        </div>

        {/* Şifrə */}
        <div>
          <input 
            type="password" 
            placeholder="Şifrə" 
            {...register("password", {
              required: 'Şifrə boş və ya yalnız boşluqlardan ibarət ola bilməz!',
              minLength: {
                value: 6,
                message: 'Şifrə ən az 6 simvol olmalıdır!'
              }
            })}
            style={{ 
              padding: '8px', 
              width: '100%', 
              boxSizing: 'border-box', 
              borderColor: errors.password ? '#e74c3c' : '#ccc' 
            }}
          />
          {errors.password && (
            <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              {errors.password.message}
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