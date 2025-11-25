import { RolNombre, UsuarioEstado } from './enums.model';

export interface UsuarioResponse {
  usuarioId: number;
  usuarioNombre: string;
  usuarioCorreo: string;
  usuarioPais: string;
  usuarioFotoPerfil: string;
  usuarioEstado: UsuarioEstado;
  rolNombre: RolNombre;
  usuarioFechaRegistro: string;
  online: boolean;
}

export interface UsuarioProfile {
  usuarioNombre: string;
  usuarioFotoPerfil: string;
  usuarioPais: string;
  usuarioFechaRegistro: string;
}

export interface UsuarioResponseForo {
  usuarioId: number;
  usuarioNombre: string;
  usuarioFotoPerfil: string;
  usuarioPais: string;
}
