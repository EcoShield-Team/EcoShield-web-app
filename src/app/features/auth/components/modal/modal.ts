import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginForm } from '../login-form/login-form';
import {RegisterForm} from '../register-form/register-form';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';


export type AuthView = 'login' | 'register' | 'forgotPassword';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    LoginForm,
    RegisterForm,
  ],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
})
export class Modal {
  @Input() currentView: AuthView = 'login';
  @Output() modalClosed = new EventEmitter<void>();

  showModal = false;

  open(view: AuthView): void {
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
}
