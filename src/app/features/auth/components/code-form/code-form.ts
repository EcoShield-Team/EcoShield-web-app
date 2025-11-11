import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-code-form',
  standalone: true,
  imports: [ReactiveFormsModule, MATERIAL_IMPORTS],
  templateUrl: './code-form.html',
  styleUrl: './code-form.css',
})
export class CodeForm {
  @Input() email = '';
  @Output() codeVerified = new EventEmitter<void>();

  isLoading = false;
  submitError: string | null = null;

  // 🔁 para “Reenviar código”
  isResending = false;
  resendMessage: string | null = null;

  codeForm = new FormGroup({
    code: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^\d{6}$/),
      ],
    }),
  });

  get code(): FormControl<string> {
    return this.codeForm.get('code') as FormControl<string>;
  }

  onSubmit(): void {
    if (this.codeForm.invalid || this.isLoading) {
      this.codeForm.markAllAsTouched();
      return;
    }

    this.submitError = null;
    this.resendMessage = null; // limpiamos el mensaje de “reenviado” al intentar continuar
    this.isLoading = true;

    const codeValue = this.code.value;

    // Simulación de verificación de código
    setTimeout(() => {
      this.isLoading = false;

      // Aquí podrías validar el código real contra backend.
      // Por ahora asumimos que siempre es válido:
      console.log('✅ Código verificado:', codeValue);
      this.codeVerified.emit();

      // Si quisieras simular un código incorrecto:
      // this.submitError = 'El código ingresado no es válido.';
    }, 900);
  }

  // 🔁 Reenviar código (simulado)
  onResendCode(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isResending || this.isLoading) {
      return;
    }

    this.submitError = null;
    this.resendMessage = null;
    this.isResending = true;

    // Aquí iría la llamada real al backend para reenviar el código
    console.log('📨 Reenviando código a', this.email || '(correo no especificado)');

    setTimeout(() => {
      this.isResending = false;
      this.resendMessage = 'Te hemos enviado un nuevo código de verificación.';
    }, 900);
  }
}
