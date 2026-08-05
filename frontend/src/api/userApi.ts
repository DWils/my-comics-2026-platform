import { apiClient } from './client';
import type {
  UserRequestDTO,
  UserResponseDTO,
  LoginRequestDTO,
  LoginResponseDTO,
} from '../types/api';

// POST /api/users — public, sert aussi d'endpoint d'inscription.
export async function registerUser(
  payload: UserRequestDTO,
): Promise<UserResponseDTO> {
  const { data } = await apiClient.post<UserResponseDTO>('/api/users', payload);
  return data;
}

// GET /api/users/{id} — protégé par JWT.
export async function getUser(id: number): Promise<UserResponseDTO> {
  const { data } = await apiClient.get<UserResponseDTO>(`/api/users/${id}`);
  return data;
}

// POST /api/auth/login — public.
export async function login(
  payload: LoginRequestDTO,
): Promise<LoginResponseDTO> {
  const { data } = await apiClient.post<LoginResponseDTO>(
    '/api/auth/login',
    payload,
  );
  return data;
}

// GET /api/users/me — protégé par JWT.
export async function getCurrentUser(): Promise<UserResponseDTO> {
  const { data } = await apiClient.get<UserResponseDTO>('/api/users/me');
  return data;
}
