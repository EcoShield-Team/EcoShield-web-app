import {Component, inject, signal} from '@angular/core';
import {Header} from '../../../../shared/components/header/header';
import {SidebarLeft} from '../../components/sidebar-left/sidebar-left';
import {PostInput} from '../../components/post-input/post-input';
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
import {MatSnackBar} from '@angular/material/snack-bar';
import {PostModal} from '../../components/post-modal/post-modal';

@Component({
  selector: 'app-feed',
  imports: [Header, SidebarLeft, PostInput, PostCard, SidebarSearch, SidebarRecomendaciones, SidebarTendencias, CommentModal, PostModal],
  templateUrl: './feed.page.html',
  styleUrl: './feed.page.css',
})
export class FeedPage {

  private comunidadService = inject(Comunidad);
  private auth = inject(Auth);
  private usuarioService = inject(UsuarioService);
  private snack = inject(MatSnackBar);

  posts = signal<PostResponse[]>([]);

  selectedPost: PostResponse | null = null;
  postToEdit: PostResponse | null = null;
  usuarioAuth: UsuarioAuth | null = null;
  usuarioPerfil: UsuarioResponse | null = null;

  showEditPost = false;
  showCommentModal = false;

  ngOnInit(): void {
    this.usuarioAuth = this.auth.getCurrentUser();

    if (this.usuarioAuth) {
      this.usuarioService.getById(this.usuarioAuth.usuarioId).subscribe({
        next: (perfil) => (this.usuarioPerfil = perfil),
        error: () => {this.snack.open(
          'No se pudo cargar tu perfil en el feed', 'Cerrar', { duration: 3000 });
        },
      });
    }

    this.loadPosts();

    window.addEventListener('refresh-feed', () => {
      this.loadPosts();
    });

  }

  private loadPosts(): void {
    this.comunidadService.getAll().subscribe({
      next: (data) => this.posts.set(data),
      error: () => {this.snack.open(
          'Error al cargar las publicaciones', 'Cerrar', { duration: 3000 });
      },
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

  onPostDeleted(postId: number) {
    this.posts.update(prev => prev.filter(p => p.postId !== postId));

    this.snack.open('Publicación eliminada correctamente', 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }

  openEditPost(post: PostResponse) {
    this.postToEdit = post;
    this.showEditPost = true;
  }

  closeEditPost() {
    this.showEditPost = false;
    this.postToEdit = null;
  }

  onPostEdited(event: any) {
    this.comunidadService.updatePost(
      this.postToEdit!.postId,
      event.dto,
      event.imagen
    ).subscribe({
      next: (updated) => {
        this.posts.update(prev =>
          prev.map(p => p.postId === updated.postId ? updated : p)
        );

        this.snack.open('Publicación actualizada', 'Cerrar', {
          duration: 2500
        });
      }
    });
  }
}
