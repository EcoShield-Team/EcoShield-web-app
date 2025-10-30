import {Component, signal} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {FormsModule} from '@angular/forms';
import {Comunidad} from '../../services/comunidad';

@Component({
  selector: 'app-post-creator',
  imports: [MATERIAL_IMPORTS, FormsModule],
  templateUrl: './post-creator.html',
  styleUrl: './post-creator.css',
})
export class PostCreator {
  titulo = '';
  descripcion = '';
  imagen: File | null = null;
  previewUrl = signal<string | null>(null);

  constructor(private comunidadService: Comunidad) {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imagen = file;
      const reader = new FileReader();
      reader.onload = () => this.previewUrl.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  publicar() {
    if (!this.titulo || !this.descripcion) return;

    const request = { postTitulo: this.titulo, postDescripcion: this.descripcion };

    this.comunidadService.createPost(request, this.imagen || undefined).subscribe({
      next: () => {
        this.titulo = '';
        this.descripcion = '';
        this.previewUrl.set(null);
      },
      error: (err) => console.error('Error al publicar', err),
    });
  }
}
