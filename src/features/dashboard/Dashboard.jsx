import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '../../components/ErrorBoundary';
import BuggyComponent from './BuggyComponent';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Məlumat yüklənərkən xəta baş verdi');
        setLoading(false);
      });
  }, []);

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newPost = { id: Date.now(), title, body: 'Yeni kontent' };
    const previousPosts = [...posts];

    setPosts([newPost, ...posts]);
    setTitle('');

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    }).catch(() => setPosts(previousPosts));
  };

  const handleDeletePost = (id) => {
    const previousPosts = [...posts];
    setPosts(posts.filter((post) => post.id !== id));

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    }).catch(() => setPosts(previousPosts));
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f0f0f0', pb: '15px', marginBottom: '25px' }}>
          <h1 style={{ margin: 0, color: '#2c3e50', fontSize: '24px' }}>Dashboard</h1>
          <button 
            onClick={handleLogoutClick} 
            style={{ padding: '8px 18px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Çıxış et
          </button>
        </div>

        {/* Error Boundary Section */}
        <div style={{ marginBottom: '30px' }}>
          <ErrorBoundary>
            <BuggyComponent />
          </ErrorBoundary>
        </div>

        {/* CRUD Section */}
        <h2 style={{ color: '#34495e', fontSize: '18px', marginBottom: '15px' }}>CRUD Əməliyyatları (Optimistic UI)</h2>

        <form onSubmit={handleAddPost} style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          <input
            type="text"
            placeholder="Yeni post başlığı daxil edin..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '10px 14px', flex: 1, border: '1px solid #ced4da', borderRadius: '6px', fontSize: '14px', outline: 'none' }}
          />
          <button 
            type="submit" 
            style={{ padding: '10px 20px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
          >
            Əlavə et
          </button>
        </form>

        {loading && <p style={{ color: '#7f8c8d' }}>Yüklənir...</p>}
        {error && <p style={{ color: '#e74c3c' }}>{error}</p>}

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {posts.map((post) => (
            <li 
              key={post.id} 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', borderBottom: '1px solid #edf2f7', transition: 'background 0.2s' }}
            >
              <span style={{ color: '#2d3748', fontSize: '14px', pr: '10px' }}>{post.title}</span>
              <button 
                onClick={() => handleDeletePost(post.id)} 
                style={{ padding: '6px 12px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
              >
                Sil
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}