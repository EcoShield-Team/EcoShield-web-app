import {Component, Inject, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Recomendaciones} from '../../services/recomendaciones';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BlogEstado, BlogTipo} from '../../../../core/models/enums.model';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {BlogResponse} from '../../../../core/models/blog.model';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgForOf, NgIf} from '@angular/common';
import {MatError, MatFormField, MatHint} from '@angular/material/form-field';
import {MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

export interface EditDialogData {
  id: number;
}

@Component({
  selector: 'app-blog-edit-modal',
  imports: [
    MatDialogTitle,
    MatProgressSpinner,
    NgIf,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatError,
    NgForOf,
    MatInput,
    MatHint,
    MatIconButton,
    MatIcon,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './blog-edit-modal.html',
  styleUrl: './blog-edit-modal.css',
})
export class BlogEditModal implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly blogService = inject(Recomendaciones);
  private readonly snackBar = inject(MatSnackBar);

  blogForm!: FormGroup;
  blogTipos = Object.values(BlogTipo);
  blogEstados = Object.values(BlogEstado);

  imagenPreviewUrl: string | null = null;
  imagenArchivo: File | null = null;
  isSaving: boolean = false;
  isLoading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<BlogEditModal>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData,
  ) {}

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      blogTipo: ['', Validators.required],
      blogTitulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      blogDescripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(4000)]],
      blogEstado: ['', Validators.required],
    });

    this.cargarDatosBlog(this.data.id);
  }

  cargarDatosBlog(id: number): void {
    this.isLoading = true;
    this.blogService.findByIdAdmin(id).subscribe({
      next: (blog: BlogResponse) => {
        this.blogForm.patchValue({
          blogTipo: blog.blogTipo,
          blogTitulo: blog.blogTitulo,
          blogDescripcion: blog.blogDescripcion,
          blogEstado: blog.blogEstado,
        });
        this.imagenPreviewUrl = blog.blogImagen || null;
        this.isLoading = false;
      },
      error: () => {
        this.snackBar.open('Error al cargar datos de edición.', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(false);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.imagenArchivo = file;
      const reader = new FileReader();
      reader.onload = (e) => this.imagenPreviewUrl = e.target?.result as string;
      reader.readAsDataURL(this.imagenArchivo);
    }
  }

  limpiarImagen(): void {
    this.imagenArchivo = null;
    this.imagenPreviewUrl = null;
    const fileInput = document.getElementById('file-upload-edit') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onSubmit(): void {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      this.snackBar.open('Revisa los campos del formulario.', 'Cerrar', { duration: 3000 });
      return;
    }

    this.isSaving = true;
    const formData = new FormData();
    const dtoData = this.blogForm.value;

    const blogRequestDto = {
      blogTipo: dtoData.blogTipo,
      blogTitulo: dtoData.blogTitulo,
      blogDescripcion: dtoData.blogDescripcion,
      blogEstado: dtoData.blogEstado,
    };
    formData.append('data', new Blob([JSON.stringify(blogRequestDto)], { type: 'application/json' }));

    if (this.imagenArchivo) {
      formData.append('imagen', this.imagenArchivo, this.imagenArchivo.name);
    }

    this.blogService.actualizarAdmin(this.data.id, formData).subscribe({
      next: () => {
        this.snackBar.open(`Blog #${this.data.id} actualizado con éxito.`, 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open('Error al actualizar. Verifique los datos.', 'Cerrar', { duration: 3000 });
        this.isSaving = false;
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
