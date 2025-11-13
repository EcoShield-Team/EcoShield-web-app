import { Component, EventEmitter, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { Auth } from '../../services/auth';
import { LoginRequest } from '../../../../core/models/auth.model';

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
  @Output() loginSuccess = new EventEmitter<void>(); // para el modal / auth page

  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  loginError: string | null = null;
  isLoading = false;
  hidePassword = true;

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

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

    const emailValue = this.email.value.trim();
    const passwordValue = this.password.value;

    const payload: LoginRequest = {
      usuarioCorreo: emailValue,
      usuarioContrasena: passwordValue,
    };

    this.authService.login(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.loginError = null;

        this.loginSuccess.emit();

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;

        if (error.status === 0) {
          this.loginError = 'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo nuevamente.';
        } else if (error.status === 401 || error.status === 400) {
          this.loginError = 'Correo o contraseña incorrectos.';
        } else if (error.status >= 500) {
          this.loginError = 'Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.';
        } else {
          this.loginError = 'No se pudo iniciar sesión. Inténtalo de nuevo.';
        }

        console.error('Error en login:', error);
      },
    });
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
