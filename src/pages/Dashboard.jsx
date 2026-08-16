import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  // READ (GET)
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

  // CREATE (POST) - Optimistic UI
  const handleAddPost = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newPost = { id: Date.now(), title, body: 'Yeni kontent' };
    const previousPosts = [...posts];

    // Optimistic Update: UI dərhal yenilənir
    setPosts([newPost, ...posts]);
    setTitle('');

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    }).catch(() => {
      // Sorğu xətaya düşərsə geri qaytarırıq (Rollback)
      setPosts(previousPosts);
      alert('Əlavə edilərkən xəta baş verdi!');
    });
  };

  // DELETE (DELETE) - Optimistic UI
  const handleDeletePost = (id) => {
    const previousPosts = [...posts];

    // Optimistic Update: Ekranda dərhal silinir
    setPosts(posts.filter((post) => post.id !== id));

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    }).catch(() => {
      // Sorğu xətaya düşərsə geri qaytarırıq (Rollback)
      setPosts(previousPosts);
      alert('Silinərkən xəta baş verdi!');
    });
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard</h1>
        <button onClick={handleLogoutClick} style={{ padding: '8px 16px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Çıxış et
        </button>
      </div>

      <h2>CRUD Əməliyyatları (Optimistic UI)</h2>

      <form onSubmit={handleAddPost} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Yeni post başlığı daxil edin..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '8px', flex: 1 }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Əlavə et
        </button>
      </form>

      {loading && <p>Yüklənir...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
            <span>{post.title}</span>
            <button onClick={() => handleDeletePost(post.id)} style={{ padding: '4px 8px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 