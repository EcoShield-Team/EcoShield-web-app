import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserManagement } from '../../services/user-management';
import { UsuarioResponse } from '../../../../core/models/usuario.model';
import { countryList, CountryOption } from '../../../../shared/utils/country-list';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';

interface UsuarioUpdateData {
  usuarioNombre: string;
  usuarioPais: string;
}

@Component({
  selector: 'app-user-edit-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MATERIAL_IMPORTS,
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
  countries: CountryOption[] = countryList;

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
      usuarioCorreo: [{ value: '', disabled: true }],
      usuarioNombre: ['', [Validators.required, Validators.maxLength(100)]],
      usuarioPais: ['', [Validators.required]],
    });

    this.cargarDatosUsuario(this.data.usuarioId);
  }

  cargarDatosUsuario(id: number): void {
    this.isLoading = true;
    this.userManagement.findById(id).subscribe({
      next: (user: UsuarioResponse) => {
        this.usuarioActual = user;

        let codigoPais = '';
        const paisEncontrado = this.countries.find(c => c.name === user.usuarioPais);

        if (paisEncontrado) {
          codigoPais = paisEncontrado.code;
        } else {
          const esCodigo = this.countries.find(c => c.code === user.usuarioPais);
          codigoPais = esCodigo ? esCodigo.code : '';
        }

        this.userForm.patchValue({
          usuarioCorreo: user.usuarioCorreo,
          usuarioNombre: user.usuarioNombre,
          usuarioPais: codigoPais,
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
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.snackBar.open('Verifica los campos obligatorios.', 'Cerrar', { duration: 3000 });
      return;
    }

    this.isSaving = true;
    const formData = new FormData();
    const formVal = this.userForm.getRawValue();

    const selectedCountry = this.countries.find(c => c.code === formVal.usuarioPais);
    const paisToSend = selectedCountry ? selectedCountry.name : formVal.usuarioPais;

    const dtoData: UsuarioUpdateData = {
      usuarioNombre: formVal.usuarioNombre,
      usuarioPais: paisToSend
    };

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
        this.snackBar.open('Error al actualizar. Verifique la imagen.', 'Cerrar', { duration: 4000 });
        this.isSaving = false;
        console.error('Error de API:', err);
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
