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

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  loginError: string | null = null;
  isLoading = false;
  showFieldErrors = false;

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onLoginSubmit(): void {
    this.showFieldErrors = true;
    this.loginError = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    setTimeout(() => {
      this.isLoading = false;

      if (email === 'diego@ecoshield.com' && password === '1234') {
        this.loginError = null;
        console.log('✅ Login exitoso');
      } else {
        this.loginError = 'Contraseña o correo incorrectos';
        console.error('❌ Error de autenticación (simulado)');
      }
    }, 800);
  }

  goToRegister(event: Event): void {
    event.preventDefault();
    this.navigateToRegister.emit();
  }

  goToForgotPassword(event: Event): void {
    this.navigateToForgot.emit();
  }
}
