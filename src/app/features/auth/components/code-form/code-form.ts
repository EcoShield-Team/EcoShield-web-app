import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { Password } from '../../services/password';
import {
  ForgotPasswordRequest,
  ValidateTokenResponse,
  VerifyCodeRequest
} from '../../../../core/models/auth.model';

@Component({
  selector: 'app-code-form',
  standalone: true,
  imports: [ReactiveFormsModule, MATERIAL_IMPORTS],
  templateUrl: './code-form.html',
  styleUrl: './code-form.css',
})
export class CodeForm {
  @Input() email = '';
  @Output() codeVerified = new EventEmitter<string>();

  isLoading = false;
  submitError: string | null = null;

  isResending = false;
  resendMessage: string | null = null;

  codeForm = new FormGroup({
    code: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{6}$/)],
    }),
  });

  constructor(private passwordService: Password) {}

  get code(): FormControl<string> {
    return this.codeForm.get('code') as FormControl<string>;
  }

  onSubmit(): void {
    if (this.codeForm.invalid || this.isLoading) {
      this.codeForm.markAllAsTouched();
      return;
    }

    this.submitError = null;
    this.resendMessage = null;
    this.isLoading = true;

    const codeValue = this.code.value.trim();
    const emailValue = (this.email || '').trim();

    const body: VerifyCodeRequest = {
      email: emailValue,
      code: codeValue,
    };

    this.passwordService.verifyCode(body).subscribe({
      next: (res: ValidateTokenResponse) => {
        this.isLoading = false;

        if (!res.valid || !res.token) {
          this.submitError = res.message || 'El código ingresado no es válido.';
          return;
        }

        console.log('✅ Código válido. Token asociado:', res.token);
        this.codeVerified.emit(res.token);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;

        const backendMessage: string | null =
          (error.error && (error.error.message || error.error.error)) || null;

        if (error.status === 0) {
          this.submitError =
            'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo nuevamente.';
        } else if (error.status >= 500) {
          this.submitError =
            backendMessage ?? 'Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.';
        } else {
          this.submitError =
            backendMessage ?? 'No se pudo validar el código. Inténtalo de nuevo.';
        }

        console.error('Error en verify-code:', error);
      },
    });
  }

  onResendCode(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isResending || this.isLoading) {
      return;
    }

    this.submitError = null;
    this.resendMessage = null;

    if (!this.email) {
      this.submitError =
        'No podemos reenviar el código porque no tenemos tu correo. Vuelve a iniciar el proceso.';
      return;
    }

    this.isResending = true;

    const body: ForgotPasswordRequest = {
      email: this.email.trim(),
    };

    console.log('📨 Reenviando enlace de recuperación a', body.email);

    this.passwordService.forgot(body).subscribe({
      next: (res) => {
        this.isResending = false;
        this.resendMessage = 'Te hemos enviado un nuevo código de verificación.';
        console.log('📧 Forgot/resend OK:', res);
      },
      error: (error: HttpErrorResponse) => {
        this.isResending = false;

        if (error.status === 0) {
          this.submitError =
            'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo nuevamente.';
        } else if (error.status === 404) {
          this.submitError = 'Este correo no está asociado a ninguna cuenta.';
        } else if (error.status === 429) {
          this.submitError = 'Demasiadas solicitudes. Inténtalo en un minuto.';
        } else if (error.status >= 500) {
          this.submitError = 'Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.';
        } else {
          this.submitError = 'No se pudo reenviar el código. Inténtalo de nuevo.';
        }

        console.error('Error en resend forgot password:', error);
      },
    });
  }
}
