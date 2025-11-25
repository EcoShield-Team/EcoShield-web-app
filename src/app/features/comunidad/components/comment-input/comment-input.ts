import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UsuarioResponse} from '../../../../core/models/usuario.model';
import {Comunidad} from '../../services/comunidad';
import {FormsModule} from '@angular/forms';
import {ComentarioRequest} from '../../../../core/models/comentario.model';

@Component({
  selector: 'app-comment-input',
  imports: [FormsModule],
  templateUrl: './comment-input.html',
  styleUrl: './comment-input.css',
})
export class CommentInput {

  @Input() usuario!: UsuarioResponse | null;
  @Input() postId: number | null = null;

  @Input() editMode = false;
  @Input() comentarioId: number | null = null;
  @Input() textoInicial: string | null = null;

  @Output() commentCreated = new EventEmitter<any>();
  @Output() commentEdited = new EventEmitter<any>();

  nuevoComentario = '';
  expandir = false;

  constructor(private comunidad: Comunidad) {}

  ngOnChanges() {
    if (this.editMode && this.textoInicial) {
      this.expandir = true;
      this.nuevoComentario = this.textoInicial;
    }
  }

  enviarComentario() {
    if (!this.nuevoComentario.trim() || !this.postId) return;

    const dto: ComentarioRequest = {comentarioTexto: this.nuevoComentario.trim()};

    if (!this.editMode) {
      this.comunidad.crearComentario(this.postId, dto).subscribe({
        next: nuevo => {
          this.commentCreated.emit(nuevo);
          this.reset();
        }
      });
      return;
    }

    if (this.editMode && this.comentarioId) {
      this.comunidad.actualizarComentario(this.postId, this.comentarioId, dto)
        .subscribe({
          next: actualizado => {
            this.commentEdited.emit(actualizado);
            this.reset();
          }
        });
    }
  }

  private reset() {
    this.nuevoComentario = '';
    this.expandir = false;
  }

}
