export interface LoginRequest {
  usuarioCorreo: string;
  usuarioContrasena: string;
}

export interface RegisterRequest {
  usuarioNombre: string;
  usuarioCorreo: string;
  usuarioContrasena: string;
  usuarioPais: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string; // Instant → string ISO
  usuario: UsuarioAuth;
}

export interface UsuarioAuth {
  usuarioId: number;
  usuarioNombre: string;
  usuarioCorreo: string;
  usuarioRol: string;
}
