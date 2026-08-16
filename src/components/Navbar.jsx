import { NavLink } from 'react-router-dom';

export default function Navbar({ isAuthenticated }) {
  return (
    <nav style={{ padding: '15px 20px', background: '#2c3e50', display: 'flex', gap: '20px', alignItems: 'center' }}>
      <NavLink 
        to="/" 
        style={({ isActive }) => ({ 
          color: '#fff', 
          textDecoration: 'none', 
          fontWeight: isActive ? 'bold' : 'normal',
          borderBottom: isActive ? '2px solid #3498db' : 'none'
        })}
      >
        Ana Səhifə
      </NavLink>

      {isAuthenticated ? (
        <NavLink 
          to="/dashboard" 
          style={({ isActive }) => ({ 
            color: '#fff', 
            textDecoration: 'none', 
            fontWeight: isActive ? 'bold' : 'normal',
            borderBottom: isActive ? '2px solid #3498db' : 'none'
          })}
        >
          Dashboard (Qorunan)
        </NavLink>
      ) : (
        <NavLink 
          to="/login" 
          style={({ isActive }) => ({ 
            color: '#fff', 
            textDecoration: 'none', 
            fontWeight: isActive ? 'bold' : 'normal',
            borderBottom: isActive ? '2px solid #3498db' : 'none'
          })}
        >
          Giriş
        </NavLink>
      )}
    </nav>
  );
}