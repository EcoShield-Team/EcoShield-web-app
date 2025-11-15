import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PostResponse} from '../../../../core/models/post.model';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {Router} from '@angular/router';
import {DatePipe, NgClass} from '@angular/common';
import {Comunidad} from '../../services/comunidad';

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
  showImageModal = false;

  constructor(private router: Router, private comunidad: Comunidad) {}

  openImage(event: Event) {
    event.stopPropagation();
    this.showImageModal = true;
  }

  closeImage() {
    this.showImageModal = false;
  }

  goToProfile(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/home/comunidad/perfil', this.post.usuario.usuarioId]);
  }

  verDetalle() {
    this.router.navigate(['/home/comunidad/post', this.post.postId]);
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
}
