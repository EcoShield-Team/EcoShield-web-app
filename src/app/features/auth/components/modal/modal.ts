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

  recoveryEmail: string | null = null;

  recoveryToken: string | null = null;

  successSubtitle = '';
  successTitle = '';
  successMessage = '';
  successActionLabel = 'Continuar';
  successShowButton = true;

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

  onCodeVerified(token: string): void {
    this.recoveryToken = token;
    this.onNavigate('resetPassword');
  }

  showSuccess(kind: SuccessKind): void {
    switch (kind) {
      case 'login':
        this.successSubtitle = 'Inicio de sesión';
        this.successTitle = 'Bienvenido de vuelta a EcoShield';
        this.successMessage = 'Has iniciado sesión correctamente.';
        this.successActionLabel = 'Continuar';
        this.successShowButton = false;
        break;

      case 'register':
        this.successSubtitle = 'Registro exitoso';
        this.successTitle = 'Bienvenido a la familia de EcoShield';
        this.successMessage = 'Tu cuenta ha sido creada correctamente.';
        this.successActionLabel = 'Comenzar';
        this.successShowButton = true;
        break;

      case 'password':
        this.successSubtitle = 'Recuperación de contraseña exitoso';
        this.successTitle = 'Tu contraseña ha sido actualizada';
        this.successMessage = 'Ya puedes iniciar sesión con tu nueva contraseña.';
        this.successActionLabel = 'Ir a iniciar sesión';
        this.successShowButton = true;
        break;
    }

    this.currentView = 'success';
  }

  onSuccessConfirmed(): void {
    this.currentView = 'login';
  }
}
