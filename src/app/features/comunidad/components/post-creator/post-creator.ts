// src/app/features/comunidad/components/post-creator/post-creator.ts
import { Component, EventEmitter, Output, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { Comunidad } from '../../services/comunidad';
import { PostRequest, PostResponse } from '../../../../core/models/post.model';
import { Auth } from '../../../auth/services/auth';
import { UsuarioAuth } from '../../../../core/models/auth.model';
import { UsuarioService } from '../../../../core/services/usuario';
import { UsuarioResponse } from '../../../../core/models/usuario.model';

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

  // Usuario ligth (del AuthResponse)
  usuarioActual: UsuarioAuth | null = null;

  // Perfil extendido (foto, país, etc.)
  usuarioPerfil: UsuarioResponse | null = null;
  cargandoPerfil = true;

  constructor(
    private comunidadService: Comunidad,
    private auth: Auth,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.usuarioActual = this.auth.getCurrentUser();

    if (!this.usuarioActual) {
      console.warn('PostCreator: no hay usuario logueado. Deberías proteger esta ruta con AuthGuard.');
      this.cargandoPerfil = false;
      return;
    }

    const userId = this.usuarioActual.usuarioId;

    this.usuarioService.getById(userId).subscribe({
      next: (perfil) => {
        this.usuarioPerfil = perfil;
        this.cargandoPerfil = false;
      },
      error: (err) => {
        console.error('Error cargando perfil de usuario:', err);
        this.cargandoPerfil = false;
      },
    });
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

    if (!this.usuarioActual) {
      console.error('No hay usuario autenticado. No se puede crear post.');
      return;
    }

    this.cargando.set(true);

    const request: PostRequest = {
      postTitulo: this.titulo.trim(),
      postDescripcion: this.descripcion.trim(),
      // El backend usa el usuario del JWT. No hace falta enviar más aquí.
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
