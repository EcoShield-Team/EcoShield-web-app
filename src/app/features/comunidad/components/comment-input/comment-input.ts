import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UsuarioResponse} from '../../../../core/models/usuario.model';
import {Comunidad} from '../../services/comunidad';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-comment-input',
  imports: [FormsModule],
  templateUrl: './comment-input.html',
  styleUrl: './comment-input.css',
})
export class CommentInput {

  @Input() usuario!: UsuarioResponse | null;
  @Input() postId: number | null = null;

  @Output() commentCreated = new EventEmitter<any>();

  nuevoComentario = '';
  expandir = false;

  constructor(private comunidad: Comunidad) {}

  enviarComentario() {
    if (!this.nuevoComentario.trim() || !this.postId) return;

    const dto = { comentarioTexto: this.nuevoComentario.trim() };

    this.comunidad.crearComentario(this.postId, dto).subscribe({
      next: (nuevo) => {
        this.commentCreated.emit(nuevo);
        this.nuevoComentario = '';
        this.expandir = false;
      },
      error: (e) => console.error('Error creando comentario:', e),
    });
  }

}
