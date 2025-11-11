import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { countryList, CountryOption } from '../../../../shared/utils/country-list';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, MATERIAL_IMPORTS],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.css'],
})
export class RegisterForm {

  @Output() backToLogin = new EventEmitter<void>();
  @Output() registerSuccess = new EventEmitter<void>(); // ✅ para el modal

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
      validators: [Validators.required, Validators.minLength(6)],
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

  get fullName() { return this.registerForm.get('fullName'); }
  get country()  { return this.registerForm.get('country'); }
  get email()    { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

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

    const formValue = this.registerForm.value;
    console.log('Payload listo para backend:', formValue);

    setTimeout(() => {
      this.isLoading = false;
      this.formError = null;
      console.log('✅ Registro simulado exitoso');
      this.registerSuccess.emit(); // 👈 dispara el success en el modal
    }, 800);
  }

  onBackToLogin(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.backToLogin.emit();
  }
}
