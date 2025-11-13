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
  @Input() subtitle = '';

  @Input() title = 'Operación exitosa';

  @Input() message = '';

  @Input() actionLabel = 'Continuar';

  @Input() showButton = true;

  @Output() confirmed = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit();
  }
}
