import { Component, EventEmitter, Output, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { Comunidad } from '../../services/comunidad';
import { PostRequest, PostResponse } from '../../../../core/models/post.model';

@Component({
  selector: 'app-post-creator',
  standalone: true,
  imports: [MATERIAL_IMPORTS, FormsModule],
  templateUrl: './post-creator.html',
  styleUrl: './post-creator.css',
})
export class PostCreator implements OnInit {
  @Output() postCreated = new EventEmitter<PostResponse>();

  titulo = '';
  descripcion = '';
  imagen: File | null = null;
  previewUrl = signal<string | null>(null);
  cargando = signal(false);

  usuarioActual: any = null;

  constructor(private comunidadService: Comunidad) {}

  ngOnInit(): void {
    this.usuarioActual = this.comunidadService.getUsuarioFromToken();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imagen = file;
      const reader = new FileReader();
      reader.onload = () => this.previewUrl.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  publicar(): void {
    if (!this.titulo.trim() || !this.descripcion.trim()) return;

    this.cargando.set(true);
    const request: PostRequest = {
      postTitulo: this.titulo.trim(),
      postDescripcion: this.descripcion.trim(),
    };

    this.comunidadService.createPost(request, this.imagen || undefined).subscribe({
      next: (response) => {
        this.postCreated.emit(response);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al publicar:', err);
        this.cargando.set(false);
      },
    });
  }

  private resetForm(): void {
    this.titulo = '';
    this.descripcion = '';
    this.imagen = null;
    this.previewUrl.set(null);
    this.cargando.set(false);
  }
}
