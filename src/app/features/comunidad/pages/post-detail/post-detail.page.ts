import {Component, inject, OnInit} from '@angular/core';
import {Header} from '../../../../shared/components/header/header';
import {PostCard} from '../../components/post-card/post-card';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
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
import {CommentModal} from '../../components/comment-modal/comment-modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PostModal} from '../../components/post-modal/post-modal';

@Component({
  selector: 'app-post-detail',
  imports: [Header, PostCard, SidebarLeft, SidebarRecomendaciones, SidebarSearch, SidebarTendencias, CommentCard, RouterLink, FormsModule, CommentInput, CommentModal, PostModal],
  templateUrl: './post-detail.page.html',
  styleUrl: './post-detail.page.css',
})
export class PostDetailPage implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private comunidadService = inject(Comunidad);
  private auth = inject(Auth);
  private usuarioService = inject(UsuarioService);
  private snack = inject(MatSnackBar);

  post: PostResponse | null = null;
  comentarios: any[] = [];
  cargando = true;

  postToEdit: PostResponse | null = null;
  showEditPost = false;

  usuarioAuth: UsuarioAuth | null = null;
  usuarioPerfil: UsuarioResponse | null = null;

  mostrarModal = false;
  editMode = false;
  comentarioAEditar: any = null;

  ngOnInit() {
    this.usuarioAuth = this.auth.getCurrentUser();

    if (this.usuarioAuth) {
      this.usuarioService.getById(this.usuarioAuth.usuarioId).subscribe(res => {
        this.usuarioPerfil = res;
      });
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.comunidadService.getById(id).subscribe({
      next: (p) => {
        this.post = p;
        this.cargarComentarios(p.postId);
      },
      error: () => {
        this.snack.open('No se pudo cargar la publicación', 'Cerrar', {duration: 3000,});
        this.router.navigate(['/comunidad']);
      },
    });
  }

  private cargarComentarios(postId: number): void {
    this.comunidadService.getComentariosByPost(postId).subscribe({
      next: (res) => {
        this.comentarios = res;
        this.cargando = false;
      },
    });
  }

  onComentarioCreado(nuevoComentario: any) {
    this.comentarios.unshift(nuevoComentario);
    if (this.post) this.post.commentCount++;
  }

  onCommentDeleted(comentarioId: number) {
    this.comentarios = this.comentarios.filter(c => c.comentarioId !== comentarioId);
    if (this.post) this.post.commentCount--;
  }

  onEditRequested(comentario: any) {
    this.comentarioAEditar = comentario;
    this.editMode = true;
    this.mostrarModal = true;
  }

  onComentarioEditado(c: any) {
    this.comentarios = this.comentarios.map(x =>
      x.comentarioId === c.comentarioId ? c : x
    );
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.editMode = false;
    this.comentarioAEditar = null;
  }

  onPostDeleted() {
    this.snack.open('Publicación eliminada', 'Cerrar', { duration: 3000 });
    this.router.navigate(['/comunidad']);
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
    if (!this.postToEdit) return;

    this.comunidadService.updatePost(this.postToEdit.postId, event.dto, event.imagen
    ).subscribe({
      next: (updated) => {
        this.post = updated;
        this.closeEditPost();

        this.snack.open('Publicación actualizada', 'Cerrar', {duration: 2500});
      }
    });
  }

}
