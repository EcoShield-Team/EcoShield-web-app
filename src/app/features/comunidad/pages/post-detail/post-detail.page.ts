import {Component, OnInit} from '@angular/core';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';
import {Header} from '../../../../shared/components/header/header';
import {PostCard} from '../../components/post-card/post-card';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {SidebarLeft} from '../../components/sidebar-left/sidebar-left';
import {SidebarRecomendaciones} from '../../components/sidebar-recomendaciones/sidebar-recomendaciones';
import {SidebarSearch} from '../../components/sidebar-search/sidebar-search';
import {SidebarTendencias} from '../../components/sidebar-tendencias/sidebar-tendencias';
import {PostResponse} from '../../../../core/models/post.model';
import {Comunidad} from '../../services/comunidad';
import {CommentCard} from '../../components/comment-card/comment-card';
import {UsuarioAuth} from '../../../../core/models/auth.model';
import {UsuarioResponse} from '../../../../core/models/usuario.model';
import {UsuarioService} from '../../../../core/services/usuario.service';
import {Auth} from '../../../auth/services/auth';
import {FormsModule} from '@angular/forms';
import {CommentInput} from '../../components/comment-input/comment-input';

@Component({
  selector: 'app-post-detail',
  imports: [Breadcrumb, Header, PostCard, SidebarLeft, SidebarRecomendaciones, SidebarSearch, SidebarTendencias, CommentCard, RouterLink, FormsModule, CommentInput],
  templateUrl: './post-detail.page.html',
  styleUrl: './post-detail.page.css',
})
export class PostDetailPage implements OnInit {

  post: PostResponse | null = null;
  comentarios: any[] = [];
  cargando = true;

  usuarioAuth: UsuarioAuth | null = null;
  usuarioPerfil: UsuarioResponse | null = null;

  constructor(
    private route: ActivatedRoute,
    private comunidad: Comunidad,
    private auth: Auth,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit() {
    this.usuarioAuth = this.auth.getCurrentUser();

    if (this.usuarioAuth) {
      this.usuarioService.getById(this.usuarioAuth.usuarioId).subscribe({
        next: (perfil) => this.usuarioPerfil = perfil,
        error: () => console.warn('No se pudo cargar el perfil en PostDetail'),
      });
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.comunidad.getById(id).subscribe({
      next: (p) => {
        this.post = p;
        this.cargarComentarios(p.postId);
      }
    });
  }

  cargarComentarios(postId: number) {
    this.comunidad.getComentariosByPost(postId).subscribe({
      next: (res) => {
        this.comentarios = res;
        this.cargando = false;
      }
    });
  }

  onComentarioCreado(nuevoComentario: any) {
    this.comentarios.push(nuevoComentario);
    if (this.post) {
      this.post.commentCount++;
    }
  }

}
