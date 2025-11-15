import {Component, Input} from '@angular/core';
import {DatePipe, NgClass} from '@angular/common';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {Comunidad} from '../../services/comunidad';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-comment-card',
  imports: [DatePipe, MATERIAL_IMPORTS, NgClass, RouterLink],
  templateUrl: './comment-card.html',
  styleUrl: './comment-card.css',
})
export class CommentCard {
  @Input() postId!: number;
  @Input() comment!: {
    comentarioId: number;
    usuario: {
      usuarioId: number;
      usuarioNombre: string;
      usuarioFotoPerfil: string;
    };
    comentarioTexto: string;
    comentarioFecha: string;
    likeCount: number;
    userLiked: boolean;
  };

  constructor(private comunidad: Comunidad) {}

  goToProfile(event: Event) {
    event.stopPropagation();
  }


  toggleLike(event: Event) {
    event.stopPropagation();

    this.comunidad.toggleComentarioLike(this.postId, this.comment.comentarioId).subscribe({
        next: (estado) => {
          this.comment.userLiked = estado;
          this.comment.likeCount += estado ? 1 : -1;
        }
      });
  }

}
