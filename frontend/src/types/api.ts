// Types miroir des DTOs Spring Boot de user-service
// (fr.dwils.userservice.dto.*)

export interface UserRequestDTO {
  email: string;
  password: string;
  username: string;
}

export interface UserResponseDTO {
  id: number;
  email: string;
  username: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
  email: string;
  username: string;
}

// Format d'erreur renvoyé par le GlobalExceptionHandler côté backend.
// À ajuster si besoin une fois qu'on branchera la gestion d'erreurs (module 9.5).
export interface ApiErrorResponse {
  message: string;
  [key: string]: unknown;
}
