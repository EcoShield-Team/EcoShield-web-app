import { Component } from '@angular/core';

@Component({
  selector: 'app-resultado-card',
  templateUrl: './resultado-card.html',
  styleUrls: ['./resultado-card.css'],
})
export class ResultadoCard {
  // 👉 Esta propiedad debe existir para que tu HTML la reconozca
  tab: string = 'sintomas';

  // (Opcional) puedes guardar también el resultado
  resultado: string = 'Podredumbre Gris';
}
