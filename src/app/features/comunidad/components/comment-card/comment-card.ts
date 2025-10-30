import {Component, Input} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-comment-card',
  imports: [
    DatePipe
  ],
  templateUrl: './comment-card.html',
  styleUrl: './comment-card.css',
})
export class CommentCard {
  @Input() comment!: {
    usuario: { usuarioNombre: string; usuarioFotoPerfil: string };
    texto: string;
    fecha: string;
  };
}
