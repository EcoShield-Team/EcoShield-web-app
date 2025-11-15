import {Component, signal} from '@angular/core';
import {Header} from '../../../../shared/components/header/header';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';
import {SidebarLeft} from '../../components/sidebar-left/sidebar-left';
import {PostCreator} from '../../components/post-creator/post-creator';
import {PostCard} from '../../components/post-card/post-card';
import {PostResponse} from '../../../../core/models/post.model';
import {Comunidad} from '../../services/comunidad';
import {SidebarSearch} from '../../components/sidebar-search/sidebar-search';
import {SidebarRecomendaciones} from '../../components/sidebar-recomendaciones/sidebar-recomendaciones';
import {SidebarTendencias} from '../../components/sidebar-tendencias/sidebar-tendencias';
import {CommentModal} from '../../components/comment-modal/comment-modal';
import {UsuarioAuth} from '../../../../core/models/auth.model';
import {UsuarioResponse} from '../../../../core/models/usuario.model';
import {Auth} from '../../../auth/services/auth';
import {UsuarioService} from '../../../../core/services/usuario.service';

@Component({
  selector: 'app-feed',
  imports: [Header, Breadcrumb, SidebarLeft, PostCreator, PostCard, SidebarSearch, SidebarRecomendaciones, SidebarTendencias, CommentModal],
  templateUrl: './feed.page.html',
  styleUrl: './feed.page.css',
})
export class FeedPage {
  posts = signal<PostResponse[]>([]);
  selectedPost: PostResponse | null = null;
  showCommentModal = false;

  usuarioAuth: UsuarioAuth | null = null;
  usuarioPerfil: UsuarioResponse | null = null;


  constructor(
    private comunidadService: Comunidad,
    private auth: Auth,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuarioAuth = this.auth.getCurrentUser();

    if (this.usuarioAuth) {
      this.usuarioService.getById(this.usuarioAuth.usuarioId).subscribe({
        next: (perfil) => (this.usuarioPerfil = perfil),
        error: () => console.warn('No se pudo cargar el perfil en Feed'),
      });
    }

    this.loadPosts();
    window.addEventListener('refresh-home-feed', () => {
      this.loadPosts();
    });
  }

  loadPosts(): void {
    this.comunidadService.getAll().subscribe({
      next: (data) => this.posts.set(data),
      error: (err) => console.error('Error al cargar posts:', err),
    });
  }

  agregarPost(newPost: PostResponse): void {
    this.posts.update((prev) => [newPost, ...prev]);
  }

  abrirModal(post: PostResponse) {
    this.selectedPost = post;
    this.showCommentModal = true;
  }

  cerrarModal() {
    this.showCommentModal = false;
    this.selectedPost = null;
  }

  onComentarioFeed(post: PostResponse, comentario: any) {
    this.posts.update(prev =>
      prev.map(p =>
        p.postId === post.postId
          ? { ...p, commentCount: p.commentCount + 1 } : p
      )
    );
  }
}
