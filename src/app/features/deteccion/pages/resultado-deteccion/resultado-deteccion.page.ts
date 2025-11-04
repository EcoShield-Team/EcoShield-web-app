import { Component } from '@angular/core';
import {ResultadoCard} from '../../components/resultado-card/resultado-card';
import {Header} from '../../../../shared/components/header/header';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-resultado-deteccion-page',
  templateUrl: './resultado-deteccion.page.html',
  styleUrls: ['./resultado-deteccion.page.css'],
  imports: [
    ResultadoCard,
    Header,
    Breadcrumb
  ]
})
export class ResultadoDeteccionPage {}
