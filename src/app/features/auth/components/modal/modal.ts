import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginForm } from '../login-form/login-form';
import { RegisterForm } from '../register-form/register-form';
import { ForgotPassword } from '../forgot-password/forgot-password';
import { CodeForm } from '../code-form/code-form';
import { ResetPassword } from '../reset-password/reset-password';
import { SuccessMessage } from '../success-message/success-message';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

export type AuthView =
  | 'login'
  | 'register'
  | 'forgotPassword'
  | 'code'
  | 'resetPassword'
  | 'success';

type SuccessKind = 'login' | 'register' | 'password';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    LoginForm,
    RegisterForm,
    ForgotPassword,
    CodeForm,
    ResetPassword,
    SuccessMessage,
  ],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
})
export class Modal {
  @Input() currentView: AuthView = 'login';
  @Output() modalClosed = new EventEmitter<void>();

  showModal = false;

  // Correo que se usó en "Olvidé mi contraseña"
  recoveryEmail: string | null = null;

  // Textos dinámicos para el componente de éxito
  successSubtitle = '';
  successTitle = '';
  successMessage = '';
  successActionLabel = 'Continuar';

  open(view: AuthView): void {
    console.log('🔍 open() llamado con vista:', view);
    this.currentView = view;
    this.showModal = true;
  }

  close(): void {
    this.showModal = false;
    this.modalClosed.emit();
  }

  onNavigate(nextView: AuthView): void {
    console.log(`Cambiando vista a: ${nextView}`);
    this.currentView = nextView;
  }

  onCodeSent(email: string): void {
    this.recoveryEmail = email;
    this.onNavigate('code');
  }

  // 🔹 En vez de navegar a resetSuccess, usamos la vista genérica de éxito
  // para login / registro / cambio de contraseña.
  showSuccess(kind: SuccessKind): void {
    switch (kind) {
      case 'login':
        this.successSubtitle = 'Inicio de sesión';
        this.successTitle = 'Bienvenido de vuelta a EcoShield';
        this.successMessage = 'Has iniciado sesión correctamente.';
        this.successActionLabel = 'Continuar';
        break;

      case 'register':
        this.successSubtitle = 'Registro exitoso';
        this.successTitle = 'Bienvenido a la familia de EcoShield';
        this.successMessage = 'Tu cuenta ha sido creada correctamente.';
        this.successActionLabel = 'Comenzar';
        break;

      case 'password':
        this.successSubtitle = 'Recuperar contraseña';
        this.successTitle = 'Tu contraseña ha sido actualizada';
        this.successMessage = 'Ya puedes iniciar sesión con tu nueva contraseña.';
        this.successActionLabel = 'Ir a iniciar sesión';
        break;
    }

    this.currentView = 'success';
  }

  onSuccessConfirmed(): void {
    // Lo usual: ir al login después de cualquier éxito
    this.currentView = 'login';
  }
}
