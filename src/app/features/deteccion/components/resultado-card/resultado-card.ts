import { Component } from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-resultado-card',
  templateUrl: './resultado-card.html',
  styleUrls: ['./resultado-card.css'],
  imports: [
    MATERIAL_IMPORTS
  ]
})
export class ResultadoCard {
  tab: string = 'sintomas';

  resultado: string = 'Podredumbre Gris';
}
