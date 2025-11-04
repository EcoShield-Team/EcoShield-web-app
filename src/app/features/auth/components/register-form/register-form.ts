import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

// 👇 Importamos la lista ya construida
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

  registerForm = new FormGroup({
    fullName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    country:  new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email:    new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    confirmPassword: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  formError: string | null = null;
  showFieldErrors = false;
  isLoading = false;

  hidePassword = true;
  hideConfirm = true;

  // Lista completa de países (código ISO + nombre)
  countries: CountryOption[] = countryList;


  // getters para el template
  get fullName() { return this.registerForm.get('fullName'); }
  get country()  { return this.registerForm.get('country'); }
  get email()    { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  onRegisterSubmit(): void {
    this.showFieldErrors = true;
    this.formError = null;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      if (this.email?.errors?.['email']) {
        this.formError = 'Dirección de correo inválida';
      } else {
        this.formError = 'Campos incompletos';
      }
      return;
    }

    if (this.password?.value !== this.confirmPassword?.value) {
      this.confirmPassword?.setErrors({ mismatch: true });
      this.formError = 'Las contraseñas no coinciden';
      return;
    }

    this.isLoading = true;

    const formValue = this.registerForm.value;
    console.log('Payload listo para backend:', formValue);
    // formValue.country -> 'PE', 'MX', etc.

    setTimeout(() => {
      this.isLoading = false;
      this.formError = null;
      console.log('✅ Registro simulado exitoso');
    }, 800);
  }

  onBackToLogin(event: Event): void {
    event.preventDefault();
    this.backToLogin.emit();
  }
}
