import { UsuarioResponseForo } from './usuario.model';

export interface ComentarioResponse {
  comentarioId: number;
  postId: number;
  usuario: UsuarioResponseForo;
  comentarioTexto: string;
  comentarioFecha: string;
  comentarioFechaModificacion?: string | null;
  likeCount: number;
  userLiked: boolean;
  editado: boolean;
}

export interface ComentarioRequest {
  comentarioTexto: string;
}
