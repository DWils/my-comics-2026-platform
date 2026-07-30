import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { LoginResponseDTO } from '../types/api';

interface AuthUser {
  email: string;
  username: string;
}

interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  login: (response: LoginResponseDTO) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Restaure la session depuis localStorage au montage (sinon un refresh
    // de page déconnecte l'utilisateur).
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function login(response: LoginResponseDTO) {
    const authUser: AuthUser = {
      email: response.email,
      username: response.username,
    };
    setToken(response.token);
    setUser(authUser);
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('auth_user', JSON.stringify(authUser));
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur de <AuthProvider>');
  }
  return context;
}