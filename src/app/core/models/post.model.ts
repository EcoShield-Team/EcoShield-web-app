import { UsuarioResponseForo } from './usuario.model';

export interface PostResponse {
  postId: number;
  usuario: UsuarioResponseForo;
  postTitulo: string;
  postDescripcion: string;
  postFoto: string;
  postFecha: string;
}

export interface PostRequest {
  postTitulo: string;
  postDescripcion: string;
}
