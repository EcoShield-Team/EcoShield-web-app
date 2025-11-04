import { Component, Input } from '@angular/core';
import { DeteccionResponse } from '../../../../core/models/deteccion.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-resultado-card',
  templateUrl: './resultado-card.html',
  styleUrls: ['./resultado-card.css'],
  imports: [CommonModule]
})
export class ResultadoCard {
  @Input() data: DeteccionResponse | null = null;
  tab: string = 'sintomas';
}
