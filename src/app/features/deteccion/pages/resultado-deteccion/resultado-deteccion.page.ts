import { Component } from '@angular/core';
import {ResultadoCard} from '../../components/resultado-card/resultado-card';
import {Header} from '../../../../shared/components/header/header';

@Component({
  selector: 'app-resultado-deteccion-page',
  templateUrl: './resultado-deteccion.page.html',
  styleUrls: ['./resultado-deteccion.page.css'],
  imports: [
    ResultadoCard,
    Header
  ]
})
export class ResultadoDeteccionPage {}
