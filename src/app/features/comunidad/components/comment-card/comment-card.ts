import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {DatePipe, NgClass} from '@angular/common';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {Comunidad} from '../../services/comunidad';
import {RouterLink} from '@angular/router';
import {Auth} from '../../../auth/services/auth';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialog} from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-comment-card',
  imports: [DatePipe, MATERIAL_IMPORTS, NgClass, RouterLink],
  templateUrl: './comment-card.html',
  styleUrl: './comment-card.css',
})
export class CommentCard {

  @Input() postId!: number;
  @Input() postAuthorId!: number;
  @Input() comment!: any;
  @Input() allowEdit = true;

  @Output() deleted = new EventEmitter<number>();
  @Output() editRequested = new EventEmitter<any>();

  private comunidad = inject(Comunidad);
  private auth = inject(Auth);
  private dialog = inject(MatDialog);

  currentUserId = this.auth.getUserId();
  userRoles = this.auth.getRoles();

  isOwnerComment() {
    return this.allowEdit && this.comment.usuario.usuarioId === this.currentUserId;
  }

  isOwnerPost() {
    return this.postAuthorId === this.currentUserId;
  }

  isAdmin() {
    return this.userRoles.includes('ROLE_ADMIN');
  }

  canManage() {
    return this.isOwnerComment() || this.isOwnerPost() || this.isAdmin();
  }

  editarComentario(event: Event, trigger: MatMenuTrigger) {
    event.stopPropagation();
    trigger.closeMenu();
    this.editRequested.emit(this.comment);
  }

  eliminarComentario(event: Event, trigger: MatMenuTrigger) {
    event.stopPropagation();
    trigger.closeMenu();

    const ref = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Eliminar comentario',
        message: '¿Estás seguro de que deseas eliminar este comentario? Esta acción no se puede deshacer.'
      }
    });

    ref.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;

      this.comunidad.deleteComentario(this.postId, this.comment.comentarioId)
        .subscribe({
          next: () => this.deleted.emit(this.comment.comentarioId),
          error: () => {}
        });
    });
  }

  toggleLike(event: Event) {
    event.stopPropagation();

    this.comunidad.toggleComentarioLike(this.postId, this.comment.comentarioId)
      .subscribe({
        next: estado => {
          this.comment.userLiked = estado;
          this.comment.likeCount += estado ? 1 : -1;
        }
      });
  }

}
