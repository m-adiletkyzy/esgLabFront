import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access');
    setIsAuthenticated(!!token);
  }, []);

  const login = (access, refresh) => {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) return;

    const refreshToken = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/auth/jwt/refresh/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh })
        });

        if (!res.ok) {
          // В разработке — просто игнорируем неуспешный refresh, можно логировать
          return;
        }

        const data = await res.json();
        if (data?.access) {
          localStorage.setItem('access', data.access);
        }
      } catch (error) {
        // Игнорируем network-errors, чтобы не ломать UI (например, сервер не поднят)
        // console.debug('refresh token failed', error);
      }
    };

    refreshToken();
  }, []);

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}