import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { Password } from '../../services/password';
import { ForgotPasswordRequest } from '../../../../core/models/auth.model';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, MATERIAL_IMPORTS],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  @Output() backToLogin = new EventEmitter<void>();
  @Output() codeSent = new EventEmitter<string>();

  isLoading = false;
  submitError: string | null = null;

  forgotForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  constructor(private passwordService: Password) {}

  get email(): FormControl<string> {
    return this.forgotForm.get('email') as FormControl<string>;
  }

  onSubmit(): void {
    if (this.forgotForm.invalid || this.isLoading) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.submitError = null;
    this.isLoading = true;

    const emailValue = this.email.value.trim();

    const body: ForgotPasswordRequest = {
      email: emailValue,
    };

    this.passwordService.forgot(body).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.submitError = null;

        console.log('📧 Forgot password OK:', res);
        this.codeSent.emit(emailValue);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;

        const backendMessage: string | null =
          (error.error && (error.error.message || error.error.error)) || null;

        if (error.status === 0) {
          this.submitError =
            'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo nuevamente.';
        } else if (error.status === 404) {
          this.submitError =
            backendMessage ?? 'Este correo no está asociado a ninguna cuenta.';
        } else if (error.status === 429) {
          this.submitError =
            backendMessage ?? 'Demasiadas solicitudes. Inténtalo en un minuto.';
        } else if (error.status >= 500) {
          this.submitError =
            'Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.';
        } else {
          this.submitError =
            backendMessage ?? 'No se pudo procesar la solicitud. Inténtalo de nuevo.';
        }

        console.error('Error en forgot password:', error);
      },
    });
  }

  onBackToLogin(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.backToLogin.emit();
  }
}
