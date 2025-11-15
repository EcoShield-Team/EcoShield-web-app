import { UsuarioResponseForo } from './usuario.model';

export interface ComentarioResponse {
  comentarioId: number;
  usuario: UsuarioResponseForo;
  comentarioTexto: string;
  comentarioFecha: string;
  likeCount: number;
  userLiked: boolean;
}

export interface ComentarioRequest {
  postId?: number;
  comentarioTexto: string;
}
