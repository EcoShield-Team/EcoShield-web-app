import { BlogEstado, BlogTipo } from './enums.model';

export interface BlogResponse {
  blogId: number;
  usuarioId: number;
  blogTipo: BlogTipo;
  blogTitulo: string;
  blogDescripcion: string;
  blogImagen: string;
  blogEstado: BlogEstado;
  blogFechaPublicacion: string;
}

export interface BlogRequest {
  blogTipo: BlogTipo;
  blogTitulo: string;
  blogDescripcion: string;
  blogEstado: BlogEstado;
  usuarioId?: number;
}
