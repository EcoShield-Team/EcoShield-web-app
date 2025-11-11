import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, MATERIAL_IMPORTS],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  @Output() passwordChanged = new EventEmitter<void>();

  isLoading = false;
  submitError: string | null = null;

  passwordForm = new FormGroup({
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
    confirmPassword: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

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

    const pass = this.password.value;
    const confirm = this.confirmPassword.value;

    if (pass !== confirm) {
      this.confirmPassword.setErrors({ mismatch: true });
      this.confirmPassword.markAsTouched();
      this.submitError = 'Las contraseñas no coinciden.';
      return;
    }

    this.isLoading = true;

    // 🔒 Simulación de cambio de contraseña
    setTimeout(() => {
      this.isLoading = false;
      console.log('✅ Contraseña restablecida correctamente');
      this.passwordChanged.emit();
    }, 900);
  }
}
