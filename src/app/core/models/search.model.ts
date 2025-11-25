import { PostResponse } from "./post.model";
import {UsuarioResponseForo} from './usuario.model';

export interface SearchResponse {
  posts?: PostResponse[];
  usuarios?: UsuarioResponseForo[];
}
