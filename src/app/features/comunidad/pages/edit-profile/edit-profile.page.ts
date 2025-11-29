import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {Auth} from '../../../auth/services/auth';
import {UserManagement} from '../../../user-management/services/user-management';
import {ChangePasswordRequest} from '../../../../core/models/auth.model';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { countryList, CountryOption } from '../../../../shared/utils/country-list';
import { UsuarioResponse } from '../../../../core/models/usuario.model';
import { Header } from '../../../../shared/components/header/header';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MATERIAL_IMPORTS, Header],
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.css']
})
export class EditProfilePage implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private userManagement = inject(UserManagement);

  activeTab: 'profile' | 'security' = 'profile';
  isLoading = true;
  isSaving = false;
  currentUserId: number | null = null;

  securityStatus: 'success' | 'error' | null = null;
  securityMessage: string = '';

  countries: CountryOption[] = countryList;
  imagenPreviewUrl: string | null = null;
  imagenArchivo: File | null = null;

  profileForm: FormGroup = this.fb.group({
    usuarioNombre: ['', [Validators.required]],
    usuarioCorreo: [{ value: '', disabled: true }, [Validators.required]],
    usuarioPais: ['', [Validators.required]]
  });

  hideCurrent = true;
  hideNew = true;
  hideConfirm = true;

  securityForm: FormGroup = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmNewPassword: ['', [Validators.required]]
  }, { validators: [this.passwordMatchValidator, this.passwordDifferentValidator] });

  ngOnInit() {
    this.currentUserId = this.authService.getUserId();
    if (this.currentUserId) {
      this.cargarDatosUsuario(this.currentUserId);
    } else {
      this.isLoading = false;
    }
  }

  cargarDatosUsuario(id: number): void {
    this.isLoading = true;
    this.userManagement.findById(id).subscribe({
      next: (user: UsuarioResponse) => {
        let codigoPais = '';
        const paisEncontrado = this.countries.find(c => c.name === user.usuarioPais);
        if (paisEncontrado) {
          codigoPais = paisEncontrado.code;
        } else {
          const esCodigo = this.countries.find(c => c.code === user.usuarioPais);
          codigoPais = esCodigo ? esCodigo.code : '';
        }

        this.profileForm.patchValue({
          usuarioNombre: user.usuarioNombre,
          usuarioCorreo: user.usuarioCorreo,
          usuarioPais: codigoPais
        });

        this.imagenPreviewUrl = user.usuarioFotoPerfil || null;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
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
    const fileInput = document.getElementById('file-upload-profile') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onSaveProfile() {
    if (this.profileForm.invalid || !this.currentUserId) return;

    this.isSaving = true;
    const formData = new FormData();
    const rawValue = this.profileForm.getRawValue();

    const codigoSeleccionado = rawValue.usuarioPais;
    const paisObj = this.countries.find(c => c.code === codigoSeleccionado);
    const nombrePais = paisObj ? paisObj.name : codigoSeleccionado;

    const dtoData = {
      usuarioNombre: rawValue.usuarioNombre,
      usuarioPais: nombrePais
    };

    formData.append('data', new Blob([JSON.stringify(dtoData)], { type: 'application/json' }));

    if (this.imagenArchivo) {
      formData.append('imagen', this.imagenArchivo, this.imagenArchivo.name);
    }

    this.userManagement.updateProfile(this.currentUserId, formData).subscribe({
      next: (res) => {
        alert('Perfil actualizado correctamente');
        this.isSaving = false;
        this.cargarDatosUsuario(this.currentUserId!);
      },
      error: (err) => {
        console.error(err);
        this.isSaving = false;
      }
    });
  }

  onChangePassword() {
    this.securityStatus = null;

    if (this.securityForm.invalid) {
      this.securityStatus = 'error';
      this.securityMessage = 'Por favor, corrige los errores en el formulario.';
      return;
    }

    this.isSaving = true;

    const { currentPassword, newPassword, confirmNewPassword } = this.securityForm.value;
    const payload: ChangePasswordRequest = { currentPassword, newPassword, confirmNewPassword };

    this.authService.changePassword(payload).subscribe({
      next: () => {
        this.isSaving = false;
        this.securityForm.reset();

        this.securityStatus = 'success';
        this.securityMessage = '¡Contraseña actualizada con éxito! Deberás iniciar sesión nuevamente.';

        setTimeout(() => this.authService.logout(), 3000);
      },
      error: (err) => {
        this.isSaving = false;
        // MENSAJE DE ERROR GRANDE
        this.securityStatus = 'error';
        this.securityMessage = 'La contraseña actual es incorrecta. Inténtalo de nuevo.';
      }
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPass = control.get('newPassword')?.value;
    const confirmPass = control.get('confirmNewPassword')?.value;

    if (newPass && confirmPass && newPass !== confirmPass) {
      control.get('confirmNewPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      if (control.get('confirmNewPassword')?.hasError('mismatch')) {
        control.get('confirmNewPassword')?.setErrors(null);
      }
      return null;
    }
  }

  passwordDifferentValidator(control: AbstractControl): ValidationErrors | null {
    const currentPass = control.get('currentPassword')?.value;
    const newPass = control.get('newPassword')?.value;

    if (currentPass && newPass && currentPass === newPass) {
      control.get('newPassword')?.setErrors({ sameAsCurrent: true });
      return { sameAsCurrent: true };
    }

    if (control.get('newPassword')?.hasError('sameAsCurrent')) {
      const errors = control.get('newPassword')?.errors;
      if (errors) {
        delete errors['sameAsCurrent'];
        if (Object.keys(errors).length === 0) control.get('newPassword')?.setErrors(null);
        else control.get('newPassword')?.setErrors(errors);
      }
    }
    return null;
  }

  switchTab(tab: 'profile' | 'security') {
    this.activeTab = tab;
    this.securityStatus = null;
  }
}
