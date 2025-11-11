import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

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

    const emailValue = this.email.value;

    // Simulación de llamada al backend
    setTimeout(() => {
      this.isLoading = false;

      console.log('📧 Código de recuperación enviado a:', emailValue);

      // Aquí lanzarías la petición real al backend con emailValue
      this.codeSent.emit(emailValue);
    }, 900);
  }

  onBackToLogin(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.backToLogin.emit();
  }
}
