import {Component, Inject, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {UserManagement} from '../../services/user-management';
import {UsuarioResponse} from '../../../../core/models/usuario.model';
import {MatCard} from '@angular/material/card';

interface UsuarioUpdateData {
  usuarioNombre: string;
  usuarioPais: string;
}

@Component({
  selector: 'app-user-edit-modal',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatIconModule,
    MatInputModule, MatSelectModule, MatSnackBarModule, MatProgressSpinnerModule, MatCard,
  ],
  templateUrl: './user-edit-modal.html',
  styleUrl: './user-edit-modal.css',
})

export class UserEditModal implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly userManagement = inject(UserManagement);
  private readonly snackBar = inject(MatSnackBar);

  userForm!: FormGroup;

  usuarioActual!: UsuarioResponse;

  imagenPreviewUrl: string | null = null;
  imagenArchivo: File | null = null;

  isSaving: boolean = false;
  isLoading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<UserEditModal>,
    @Inject(MAT_DIALOG_DATA) public data: { usuarioId: number },
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      usuarioNombre: ['', [Validators.required, Validators.maxLength(100)]],
      usuarioPais: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.cargarDatosUsuario(this.data.usuarioId);
  }

  cargarDatosUsuario(id: number): void {
    this.isLoading = true;
    this.userManagement.findById(id).subscribe({
      next: (user: UsuarioResponse) => {
        this.usuarioActual = user;
        this.userForm.patchValue({
          usuarioNombre: user.usuarioNombre,
          usuarioPais: user.usuarioPais,
        });
        this.imagenPreviewUrl = user.usuarioFotoPerfil || null;
        this.isLoading = false;
      },
      error: () => {
        this.snackBar.open('Error al cargar datos del usuario.', 'Cerrar', { duration: 3000 });
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
    const fileInput = document.getElementById('file-upload-user-edit') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.snackBar.open('Verifica los campos obligatorios.', 'Cerrar', { duration: 3000 });
      return;
    }

    this.isSaving = true;
    const formData = new FormData();
    const dtoData: UsuarioUpdateData = this.userForm.value as UsuarioUpdateData;

    formData.append('data', new Blob([JSON.stringify(dtoData)], { type: 'application/json' }));

    if (this.imagenArchivo) {
      formData.append('imagen', this.imagenArchivo, this.imagenArchivo.name);
    }

    this.userManagement.updateProfile(this.data.usuarioId, formData).subscribe({
      next: () => {
        this.snackBar.open(`Perfil de ${this.usuarioActual.usuarioNombre} actualizado.`, 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open('Error al actualizar. Verifique la imagen y el tamaño.', 'Cerrar', { duration: 4000 });
        this.isSaving = false;
        console.error('Error de API:', err);
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
