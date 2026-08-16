import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>404 - Səhifə Tapılmadı</h1>
      <p>Axtardığınız səhifə mövcut deyil.</p>
      <Link to="/" style={{ color: '#3498db' }}>Ana Səhifəyə Qayıt</Link>
    </div>
  );
}