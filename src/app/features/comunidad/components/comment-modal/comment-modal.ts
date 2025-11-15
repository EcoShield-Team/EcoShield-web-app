import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PostResponse} from '../../../../core/models/post.model';
import {UsuarioResponse} from '../../../../core/models/usuario.model';
import {CommentInput} from '../comment-input/comment-input';

@Component({
  selector: 'app-comment-modal',
  imports: [
    CommentInput
  ],
  templateUrl: './comment-modal.html',
  styleUrl: './comment-modal.css',
})
export class CommentModal {

  @Input() post!: PostResponse;
  @Input() usuario!: UsuarioResponse | null;

  @Output() closed = new EventEmitter<void>();
  @Output() commentCreated = new EventEmitter<any>();

  cerrar() {
    this.closed.emit();
  }

  onComentarioCreado(c: any) {
    this.commentCreated.emit(c);
    this.cerrar();
  }
}
