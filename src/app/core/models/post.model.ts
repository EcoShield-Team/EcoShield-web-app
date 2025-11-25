import { UsuarioResponseForo } from './usuario.model';

export interface PostResponse {
  postId: number;
  usuario: UsuarioResponseForo;
  postTitulo: string;
  postDescripcion: string;
  postFoto: string;
  postFecha: string;
  postFechaModificacion?: string | null;
  likeCount: number;
  userLiked: boolean;
  commentCount: number;
  editado: boolean;
}


export interface PostRequest {
  postTitulo: string;
  postDescripcion: string;
}
