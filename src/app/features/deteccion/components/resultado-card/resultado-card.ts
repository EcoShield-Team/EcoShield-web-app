import { Component } from '@angular/core';

@Component({
  selector: 'app-resultado-card',
  templateUrl: './resultado-card.html',
  styleUrls: ['./resultado-card.css'],
})
export class ResultadoCard {
  tab: string = 'sintomas';

  resultado: string = 'Podredumbre Gris';
}
