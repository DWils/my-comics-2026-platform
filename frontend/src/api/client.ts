import axios from 'axios';

// Client HTTP central pour parler à user-service.
// baseURL vient de .env.development (VITE_API_BASE_URL) — voir Vite env files.
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Injecte automatiquement le JWT (stocké dans localStorage par AuthContext)
// sur chaque requête sortante, s'il existe.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// NOTE (module 9.5) : on ajoutera ici un interceptor de réponse pour gérer
// le 401 (token expiré/invalide -> déconnexion automatique).