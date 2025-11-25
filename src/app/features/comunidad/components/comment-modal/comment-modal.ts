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

  @Input() usuario!: UsuarioResponse | null;
  @Input() post!: PostResponse;
  @Input() editMode = false;
  @Input() comentario: any = null;


  @Output() closed = new EventEmitter<void>();
  @Output() commentCreated = new EventEmitter<any>();
  @Output() commentEdited = new EventEmitter<any>();

  cerrar() {
    this.closed.emit();
  }

  onComentarioCreado(c: any) {
    this.commentCreated.emit(c);
    this.cerrar();
  }

  onComentarioEditado(c: any) {
    this.commentEdited.emit(c);
    this.cerrar();
  }

}
