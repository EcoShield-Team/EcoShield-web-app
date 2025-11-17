import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Recomendaciones} from '../../services/recomendaciones';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {BlogEstado, BlogTipo} from '../../../../core/models/enums.model';
import {MatError, MatFormField, MatHint} from '@angular/material/form-field';
import {MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-blog-register-modal',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatError,
    NgForOf,
    NgIf,
    MatInput,
    MatHint,
    MatIconButton,
    MatIcon,
    MatDialogActions,
    MatButton,
    MatProgressSpinner
  ],
  templateUrl: './blog-register-modal.html',
  styleUrl: './blog-register-modal.css',
})
export class BlogRegisterModal implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly blogService = inject(Recomendaciones);
  private readonly snackBar = inject(MatSnackBar);
  public dialogRef = inject(MatDialogRef<BlogRegisterModal>);

  blogForm!: FormGroup;
  blogTipos = Object.values(BlogTipo);
  blogEstados = Object.values(BlogEstado);

  imagenPreviewUrl: string | null = null;
  imagenArchivo: File | null = null;
  isSaving: boolean = false;

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      blogTipo: [BlogTipo.TIP, Validators.required],
      blogTitulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      blogDescripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(4000)]],
      blogEstado: [BlogEstado.ACTIVO, Validators.required],
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
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onSubmit(): void {
    if (this.blogForm.invalid || !this.imagenArchivo) {
      this.blogForm.markAllAsTouched();
      this.snackBar.open('Complete los datos y suba una imagen.', 'Cerrar', { duration: 3000 });
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

    this.blogService.registrarAdmin(formData).subscribe({
      next: () => {
        this.snackBar.open('Blog registrado con éxito.', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open('Error al registrar. Verifique el servidor.', 'Cerrar', { duration: 3000 });
        this.isSaving = false;
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
