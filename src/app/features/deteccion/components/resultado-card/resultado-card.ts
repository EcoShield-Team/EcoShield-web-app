import { Component, Input } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { DeteccionResponse } from '../../../../core/models/deteccion.model';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-resultado-card',
  templateUrl: './resultado-card.html',
  styleUrls: ['./resultado-card.css'],
  imports: [MATERIAL_IMPORTS, DecimalPipe]
})
export class ResultadoCard {
  @Input() data!: DeteccionResponse;
  tab: string = 'sintomas';
}
