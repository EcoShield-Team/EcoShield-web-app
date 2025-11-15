import { Component, computed, inject, signal } from '@angular/core';
import { UsuarioResponse } from '../../../../core/models/usuario.model';
import { PostResponse } from '../../../../core/models/post.model';
import { Comunidad } from '../../services/comunidad';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header } from '../../../../shared/components/header/header';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { SidebarLeft } from '../../components/sidebar-left/sidebar-left';
import { PostCard } from '../../components/post-card/post-card';
import { SidebarSearch } from '../../components/sidebar-search/sidebar-search';
import { SidebarRecomendaciones } from '../../components/sidebar-recomendaciones/sidebar-recomendaciones';
import { SidebarTendencias } from '../../components/sidebar-tendencias/sidebar-tendencias';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { Auth } from '../../../auth/services/auth';
import { UsuarioAuth } from '../../../../core/models/auth.model';
import { CommentModal } from '../../components/comment-modal/comment-modal';

@Component({
  selector: 'app-perfil',
  imports: [Header, Breadcrumb, SidebarLeft, PostCard, SidebarSearch, SidebarRecomendaciones, SidebarTendencias, LowerCasePipe, DatePipe, RouterLink, CommentModal],
  templateUrl: './perfil.page.html',
  styleUrl: './perfil.page.css',
})
export class PerfilPage {

  private route = inject(ActivatedRoute);
  private usuarioService = inject(UsuarioService);
  private comunidadService = inject(Comunidad);
  private auth = inject(Auth);

  usuario = signal<UsuarioResponse | null>(null);
  posts = signal<PostResponse[]>([]);
  tab = signal<'posts' | 'actividad' | 'info'>('posts');

  usuarioAuth: UsuarioAuth | null = this.auth.getCurrentUser();
  usuarioPerfil: UsuarioResponse | null = null;

  selectedPost = signal<PostResponse | null>(null);
  showCommentModal = signal(false);

  esMiPerfil = () =>
    this.usuarioAuth?.usuarioId === this.usuario()?.usuarioId;

  ngOnInit() {

    // Cargar el perfil del usuario autenticado (para pasar al modal)
    if (this.usuarioAuth) {
      this.usuarioService.getById(this.usuarioAuth.usuarioId).subscribe({
        next: perfil => this.usuarioPerfil = perfil,
        error: () => console.warn('No se pudo cargar perfil auth para modal')
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
  }

  cargarPerfil(id: number, propio: boolean) {

    this.usuarioService.getById(id).subscribe({
      next: u => this.usuario.set(u),
    });

    const source = propio
      ? this.comunidadService.getMyPosts()
      : this.comunidadService.getByUsuarioId(id);

    source.subscribe({
      next: posts => this.posts.set(posts),
    });
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

}
