import {Component, EventEmitter, Output, signal, OnInit, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { Comunidad } from '../../services/comunidad';
import { PostRequest, PostResponse } from '../../../../core/models/post.model';
import { Auth } from '../../../auth/services/auth';
import { UsuarioAuth } from '../../../../core/models/auth.model';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { UsuarioResponse } from '../../../../core/models/usuario.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [MATERIAL_IMPORTS, FormsModule],
  templateUrl: './post-input.html',
  styleUrl: './post-input.css',
})
export class PostInput implements OnInit {
  @Output() postCreated = new EventEmitter<PostResponse>();

  titulo = '';
  descripcion = '';
  imagen: File | null = null;
  minTitulo = 3;
  minDescripcion = 5;

  previewUrl = signal<string | null>(null);
  cargando = signal(false);

  usuarioActual: UsuarioAuth | null = null;
  usuarioPerfil: UsuarioResponse | null = null;
  cargandoPerfil = true;

  private snack = inject(MatSnackBar);

  constructor(
    private comunidadService: Comunidad,
    private auth: Auth,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.usuarioActual = this.auth.getCurrentUser();

    if (!this.usuarioActual) {
      console.warn('PostInput: no hay usuario logueado. Deberías proteger esta ruta con AuthGuard.');
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
    if (this.formularioInvalido) return;

    this.cargando.set(true);

    const request: PostRequest = {
      postTitulo: this.titulo.trim(),
      postDescripcion: this.descripcion.trim(),
    };

    this.comunidadService.createPost(request, this.imagen || undefined).subscribe({
      next: (response) => {
        this.postCreated.emit(response);
        this.resetForm();
        this.snack.open('¡Publicación creada con éxito!', 'Cerrar', { duration: 2500 });
      },
      error: (err) => {
        const msg = err?.error?.message || 'Error inesperado';
        this.snack.open(msg, 'Cerrar', { duration: 3500 });
        this.cargando.set(false);
      }
    });
  }

  get tituloInvalido(): boolean {
    return this.titulo.trim().length < this.minTitulo;
  }

  get descripcionInvalida(): boolean {
    return this.descripcion.trim().length < this.minDescripcion;
  }

  get formularioInvalido(): boolean {
    return this.tituloInvalido || this.descripcionInvalida || this.cargando();
  }

  private resetForm(): void {
    this.titulo = '';
    this.descripcion = '';
    this.imagen = null;
    this.previewUrl.set(null);
    this.cargando.set(false);
  }
}
