import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-success-message',
  standalone: true,
  imports: [MATERIAL_IMPORTS],
  templateUrl: './success-message.html',
  styleUrl: './success-message.css',
})
export class SuccessMessage {
  /** Texto pequeño de contexto, ej: "Recuperar contraseña" */
  @Input() subtitle = '';

  /** Mensaje principal grande, ej: "Bienvenido a la familia de EcoShield" */
  @Input() title = 'Operación exitosa';

  /** Texto opcional debajo del logo */
  @Input() message = '';

  /** Texto del botón */
  @Input() actionLabel = 'Continuar';

  @Output() confirmed = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit();
  }
}
