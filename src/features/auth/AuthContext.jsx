import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const AuthContext = createContext();

const checkInitialToken = () => {
  const token = localStorage.getItem('token');
  const expirationTime = localStorage.getItem('tokenExpiration');

  if (token && expirationTime) {
    if (Date.now() > parseInt(expirationTime)) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      return { token: null, isAuthenticated: false };
    }
    return { token, isAuthenticated: true };
  }
  return { token: null, isAuthenticated: false };
};

const initialState = checkInitialToken();

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      const expirationTime = localStorage.getItem('tokenExpiration');

      if (token && expirationTime) {
        if (Date.now() > parseInt(expirationTime)) {
          setIsSessionModalOpen(true);
        }
      }
    };

    const interval = setInterval(checkTokenExpiration, 1000);
    return () => clearInterval(interval);
  }, []);

  const login = (token) => {
    const expirationTime = Date.now() + 2 * 60 * 1000; // 2 deq

    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationTime);
    
    dispatch({ type: 'LOGIN', payload: token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    setIsSessionModalOpen(false);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ token: state.token, isAuthenticated: state.isAuthenticated, login, logout }}>
      {children}

      {/* Modal */}
      {isSessionModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3>Sessiyanın vaxtı bitdi</h3>
            <p>Təhlükəsizlik məqsədilə sistemdəki sessiyanızın müddəti bitdi. Zəhmət olmasa yenidən daxil olun.</p>
            <button 
              onClick={() => {
                logout();
                window.location.href = '/login';
              }}
              style={modalBtnStyle}
            >
              Daxil ol səhifəsinə qayıt
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '24px',
  borderRadius: '8px',
  textAlign: 'center',
  maxWidth: '400px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const modalBtnStyle = {
  marginTop: '16px',
  padding: '10px 20px',
  backgroundColor: '#4F46E5',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};