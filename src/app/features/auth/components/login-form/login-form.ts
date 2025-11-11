import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, MATERIAL_IMPORTS],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css']
})
export class LoginForm {
  @Output() navigateToRegister = new EventEmitter<void>();
  @Output() navigateToForgot = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<void>(); // ✅ para el modal

  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  loginError: string | null = null;
  isLoading = false;
  hidePassword = true;

  get email(): FormControl<string> {
    return this.loginForm.get('email') as FormControl<string>;
  }

  get password(): FormControl<string> {
    return this.loginForm.get('password') as FormControl<string>;
  }

  onLoginSubmit(): void {
    this.loginError = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const emailValue = this.email.value;
    const passwordValue = this.password.value;

    setTimeout(() => {
      this.isLoading = false;

      if (emailValue === 'diego@ecoshield.com' && passwordValue === '1234') {
        this.loginError = null;
        console.log('✅ Login exitoso');
        this.loginSuccess.emit(); // 👈 dispara el success en el modal
      } else {
        this.loginError = 'Contraseña o correo incorrectos';
        console.error('❌ Error de autenticación (simulado)');
      }
    }, 800);
  }

  goToRegister(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.navigateToRegister.emit();
  }

  goToForgotPassword(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.navigateToForgot.emit();
  }
}
