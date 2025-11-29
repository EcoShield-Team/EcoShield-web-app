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
  expiresAt: string;
  usuario: UsuarioAuth;
}

export interface UsuarioAuth {
  usuarioId: number;
  usuarioNombre: string;
  usuarioCorreo: string;
  usuarioRol: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  tokenPreview?: string | null;
  codePreview?: string | null;
}

export interface ValidateTokenResponse {
  valid: boolean;
  message: string;
  token?: string | null;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
