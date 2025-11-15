import { UsuarioResponseForo } from './usuario.model';

export interface PostResponse {
  postId: number;
  usuario: UsuarioResponseForo;
  postTitulo: string;
  postDescripcion: string;
  postFoto: string;
  postFecha: string;
  likeCount: number;
  userLiked: boolean;
  commentCount: number;
}


export interface PostRequest {
  postTitulo: string;
  postDescripcion: string;
}
