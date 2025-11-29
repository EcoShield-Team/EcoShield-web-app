import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { countryList, CountryOption } from '../../../../shared/utils/country-list';
import { Auth } from '../../services/auth';
import { RegisterRequest } from '../../../../core/models/auth.model';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, MATERIAL_IMPORTS],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.css'],
})
export class RegisterForm {
  @Output() backToLogin = new EventEmitter<void>();
  @Output() registerSuccess = new EventEmitter<void>();

  registerForm = new FormGroup({
    fullName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    country: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(64)],
    }),
    confirmPassword: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  formError: string | null = null;
  isLoading = false;

  hidePassword = true;
  hideConfirm = true;

  countries: CountryOption[] = countryList;

  constructor(private authService: Auth) {}

  get fullName() { return this.registerForm.get('fullName'); }
  get country()  { return this.registerForm.get('country'); }
  get email()    { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  onBackToLogin(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.isLoading) return;
    this.backToLogin.emit();
  }

  onRegisterSubmit(): void {
    this.formError = null;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (this.password?.value !== this.confirmPassword?.value) {
      this.confirmPassword?.setErrors({ mismatch: true });
      this.confirmPassword?.markAsTouched();
      this.formError = 'Las contraseñas no coinciden';
      return;
    }

    this.isLoading = true;
    const selectedCode = this.country?.value;
    const foundCountry = this.countries.find(c => c.code === selectedCode);
    const paisParaGuardar = foundCountry ? foundCountry.name : selectedCode;

    const payload: RegisterRequest = {
      usuarioNombre: (this.fullName?.value ?? '').trim(),
      usuarioCorreo: (this.email?.value ?? '').trim().toLowerCase(),
      usuarioContrasena: this.password?.value ?? '',
      usuarioPais: (paisParaGuardar ?? '').trim(),
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log('✅ Registro exitoso:', res);
        this.registerSuccess.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;

        const backendMessage: string | null =
          (error.error && (error.error.message || error.error.error)) || null;

        if (error.status === 0) {
          this.formError =
            'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo nuevamente.';
        } else if (error.status === 400) {
          this.formError =
            backendMessage ??
            'Hay datos inválidos en el formulario. Revisa los campos e inténtalo de nuevo.';
        } else if (error.status >= 500) {
          this.formError =
            'Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.';
        } else {
          this.formError =
            backendMessage ?? 'No se pudo completar el registro. Inténtalo de nuevo.';
        }

        console.error('Error en registro:', error);
      },
    });
  }
}
