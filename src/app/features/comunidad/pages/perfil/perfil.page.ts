import { Component, computed, inject, signal } from '@angular/core';
import { UsuarioResponse } from '../../../../core/models/usuario.model';
import { PostResponse } from '../../../../core/models/post.model';
import { Comunidad } from '../../services/comunidad';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header } from '../../../../shared/components/header/header';
import { SidebarLeft } from '../../components/sidebar-left/sidebar-left';
import { PostCard } from '../../components/post-card/post-card';
import { SidebarSearch } from '../../components/sidebar-search/sidebar-search';
import { SidebarRecomendaciones } from '../../components/sidebar-recomendaciones/sidebar-recomendaciones';
import { SidebarTendencias } from '../../components/sidebar-tendencias/sidebar-tendencias';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { Auth } from '../../../auth/services/auth';
import { UsuarioAuth } from '../../../../core/models/auth.model';
import { CommentModal } from '../../components/comment-modal/comment-modal';
import {CommentCard} from '../../components/comment-card/comment-card';
import {PostModal} from '../../components/post-modal/post-modal';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  imports: [Header, SidebarLeft, PostCard, SidebarSearch, SidebarRecomendaciones, SidebarTendencias, LowerCasePipe, DatePipe, RouterLink, CommentModal, CommentCard, PostModal],
  templateUrl: './perfil.page.html',
  styleUrl: './perfil.page.css',
})
export class PerfilPage {

  private route = inject(ActivatedRoute);
  private usuarioService = inject(UsuarioService);
  private comunidadService = inject(Comunidad);
  private auth = inject(Auth);
  private snack = inject(MatSnackBar);

  usuario = signal<UsuarioResponse | null>(null);
  posts = signal<PostResponse[]>([]);
  tab = signal<'posts' | 'actividad' | 'info'>('posts');
  comentarios = signal<any[]>([]);

  usuarioAuth: UsuarioAuth | null = this.auth.getCurrentUser();
  usuarioPerfil: UsuarioResponse | null = null;

  selectedPost = signal<PostResponse | null>(null);
  showCommentModal = signal(false);
  postToEdit: PostResponse | null = null;
  showEditPost = false;

  esMiPerfil = () =>
    this.usuarioAuth?.usuarioId === this.usuario()?.usuarioId;

  ngOnInit() {

    if (this.usuarioAuth) {
      this.usuarioService.getById(this.usuarioAuth.usuarioId).subscribe({
        next: perfil => (this.usuarioPerfil = perfil),
        error: () => {this.snack.open(
          'No se pudo cargar tu perfil para el modal', 'Cerrar', { duration: 3000 });
        },
      });
    }

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');

      if (!idParam || idParam === 'mis-posts') {
        const myId = this.usuarioAuth?.usuarioId;
        if (!myId) return;

        this.cargarPerfil(myId, true);
        return;
      }

      const id = Number(idParam);
      if (!isNaN(id)) this.cargarPerfil(id, false);
    });

    window.addEventListener('refresh-profile', () => {
      const user = this.usuario();
      if (user) {
        this.cargarPerfil(user.usuarioId, this.esMiPerfil());
      }
    });
  }

  cargarPerfil(id: number, propio: boolean) {

    this.usuarioService.getById(id).subscribe({
      next: u => this.usuario.set(u),
    });

    const postSource = propio
      ? this.comunidadService.getMyPosts()
      : this.comunidadService.getByUsuarioId(id);

    postSource.subscribe({
      next: posts => this.posts.set(posts),
    });

    this.comunidadService.getComentariosByUsuario(id).subscribe({
      next: comentarios => this.comentarios.set(comentarios),
    });
  }

  onComentarioEliminadoActividad(id: number) {
    this.comentarios.update(prev => prev.filter(c => c.comentarioId !== id));
  }

  abrirModal(post: PostResponse) {
    this.selectedPost.set(post);
    this.showCommentModal.set(true);
  }

  cerrarModal() {
    this.showCommentModal.set(false);
    this.selectedPost.set(null);
  }

  onComentarioPerfil(post: PostResponse, nuevoComentario: any) {
    this.posts.update(prev =>
      prev.map(p =>
        p.postId === post.postId
          ? { ...p, commentCount: p.commentCount + 1 } : p
      )
    );
  }

  private getColorFromString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = '#' +
      ((hash >> 24) & 0xFF).toString(16).padStart(2, '0') +
      ((hash >> 16) & 0xFF).toString(16).padStart(2, '0') +
      ((hash >> 8) & 0xFF).toString(16).padStart(2, '0');

    return color;
  }

  bannerColor = computed(() => {
    const user = this.usuario();
    if (!user) return 'linear-gradient(135deg, #d7e8d1, #f1f9f3)';

    const c1 = this.getColorFromString(user.usuarioNombre + 'a');
    const c2 = this.getColorFromString(user.usuarioNombre + 'b');

    return `linear-gradient(135deg, ${c1}, ${c2})`;
  });

  openEditPost(post: PostResponse) {
    this.postToEdit = post;
    this.showEditPost = true;
  }

  closeEditPost() {
    this.showEditPost = false;
    this.postToEdit = null;
  }

  onPostEdited(event: any) {
    this.comunidadService.updatePost(this.postToEdit!.postId, event.dto, event.imagen
    ).subscribe({
      next: (updated) => {
        this.posts.update(prev =>
          prev.map(p => p.postId === updated.postId ? updated : p)
        );
        this.closeEditPost();

        this.snack.open('Publicación actualizada', 'Cerrar', {
          duration: 2500
        });
      }
    });
  }

}
