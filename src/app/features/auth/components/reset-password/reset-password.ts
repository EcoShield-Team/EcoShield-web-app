import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { Password } from '../../services/password';
import { ResetPasswordRequest } from '../../../../core/models/auth.model';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, MATERIAL_IMPORTS],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  @Input() token!: string;

  @Output() passwordChanged = new EventEmitter<void>();

  isLoading = false;
  submitError: string | null = null;
  hidePassword = true;
  hideConfirm = true;

  passwordForm = new FormGroup({
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
    confirmPassword: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  constructor(private passwordService: Password) {}

  get password(): FormControl<string> {
    return this.passwordForm.get('password') as FormControl<string>;
  }

  get confirmPassword(): FormControl<string> {
    return this.passwordForm.get('confirmPassword') as FormControl<string>;
  }

  onSubmit(): void {
    if (this.passwordForm.invalid || this.isLoading) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.submitError = null;

    const newPass = this.password.value;
    const confirmPass = this.confirmPassword.value;

    if (newPass !== confirmPass) {
      this.submitError = 'Las contraseñas no coinciden.';
      return;
    }

    if (!this.token) {
      this.submitError =
        'Token de recuperación no disponible. Vuelve a generar un enlace de recuperación.';
      return;
    }

    this.isLoading = true;

    const body: ResetPasswordRequest = {
      token: this.token,
      newPassword: newPass,
    };

    this.passwordService.reset(body).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log('🔑 Reset password OK:', res);
        this.passwordChanged.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;

        const backendMessage: string | null =
          (error.error && (error.error.message || error.error.error)) || null;

        if (error.status === 0) {
          this.submitError =
            'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo nuevamente.';
        } else if (error.status === 400) {
          this.submitError =
            backendMessage ?? 'El enlace o código de recuperación no es válido o ha expirado. Intenta generar uno nuevo.';
        } else if (error.status >= 500) {
          this.submitError =
            'Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.';
        } else {
          this.submitError =
            backendMessage ?? 'No se pudo actualizar la contraseña. Inténtalo de nuevo.';
        }

        console.error('Error en reset password:', error);
      },
    });
  }
}
