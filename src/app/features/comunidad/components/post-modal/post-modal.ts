import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {PostRequest, PostResponse} from '../../../../core/models/post.model';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-post-modal',
  imports: [MATERIAL_IMPORTS, FormsModule],
  templateUrl: './post-modal.html',
  styleUrl: './post-modal.css',
})
export class PostModal {

  @Input() post!: PostResponse;
  @Output() closed = new EventEmitter<void>();
  @Output() postEdited = new EventEmitter<any>();

  titulo = '';
  descripcion = '';
  imagenNueva: File | null = null;
  previewUrl = signal<string | null>(null);

  ngOnInit() {
    this.titulo = this.post.postTitulo;
    this.descripcion = this.post.postDescripcion;
    this.previewUrl.set(this.post.postFoto || null);
  }

  cerrar() {
    this.closed.emit();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imagenNueva = file;
      const reader = new FileReader();
      reader.onload = () => this.previewUrl.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  guardar() {
    const dto: PostRequest = {
      postTitulo: this.titulo.trim(),
      postDescripcion: this.descripcion.trim()
    };

    this.postEdited.emit({
      dto,
      imagen: this.imagenNueva
    });

    this.cerrar();
  }
}
