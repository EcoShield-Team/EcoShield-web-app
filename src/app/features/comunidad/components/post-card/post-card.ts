import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {PostResponse} from '../../../../core/models/post.model';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {Router} from '@angular/router';
import {DatePipe, NgClass} from '@angular/common';
import {Comunidad} from '../../services/comunidad';
import {MatDialog} from '@angular/material/dialog';
import {Auth} from '../../../auth/services/auth';
import {MatMenuTrigger} from '@angular/material/menu';
import {ConfirmDialog} from '../../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-post-card',
  imports: [MATERIAL_IMPORTS, DatePipe, NgClass],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css',
})
export class PostCard {
  @Input() post!: PostResponse;
  @Input() clickable = true;

  @Output() openCommentModal = new EventEmitter<PostResponse>();
  @Output() deleted = new EventEmitter<number>();
  @Output() editRequested = new EventEmitter<PostResponse>();

  showImageModal = false;

  private router = inject(Router);
  private comunidad = inject(Comunidad);
  private auth = inject(Auth);
  private dialog = inject(MatDialog);

  currentUserId = this.auth.getUserId();
  userRoles = this.auth.getRoles();

  isOwnerPost() {
    return this.post.usuario.usuarioId === this.currentUserId;
  }

  isAdmin() {
    return this.userRoles.includes('ROLE_ADMIN');
  }

  canManage() {
    return this.isOwnerPost() || this.isAdmin();
  }

  editarPost(event: Event, trigger: MatMenuTrigger) {
    event.stopPropagation();
    trigger.closeMenu();
    this.editRequested.emit(this.post);
  }

  eliminarPost(event: Event, trigger: MatMenuTrigger) {
    event.stopPropagation();
    trigger.closeMenu();

    const ref = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Eliminar publicación',
        message: '¿Estás seguro de eliminar este post? Esta acción no se puede deshacer.'
      }
    });

    ref.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;

      this.comunidad.deletePost(this.post.postId).subscribe({
        next: () => this.deleted.emit(this.post.postId),
        error: () => {}
      });
    });
  }

  openImage(event: Event) {
    event.stopPropagation();
    this.showImageModal = true;
  }

  closeImage() {
    this.showImageModal = false;
  }

  goToProfile(event: Event) {
    event.stopPropagation();
    this.router.navigate(['comunidad/perfil', this.post.usuario.usuarioId]);
  }

  verDetalle() {
    this.router.navigate(['comunidad/post', this.post.postId]);
  }

  abrirModalComentarios(event: Event) {
    event.stopPropagation();
    this.openCommentModal.emit(this.post);
  }

  toggleLike(event: Event) {
    event.stopPropagation();

    this.comunidad.togglePostLike(this.post.postId).subscribe({
      next: (estado) => {
        this.post.userLiked = estado;
        this.post.likeCount += estado ? 1 : -1;
      }
    });
  }

  sharePost(event: Event) {
    event.stopPropagation();

    const url = `${window.location.origin}/comunidad/post/${this.post.postId}`;
    const title = this.post.postTitulo || 'Mira este post en EcoShield!';
    const text = this.post.postDescripcion || 'Te comparto esta publicación.';

    if (navigator.share) {
      navigator.share({
        title,
        text,
        url
      }).catch(err => {
        console.warn('Sharing failed:', err);
      });
      return;
    }

    navigator.clipboard.writeText(url).then(() => {
      alert('Enlace copiado al portapapeles');
    });
  }

}
