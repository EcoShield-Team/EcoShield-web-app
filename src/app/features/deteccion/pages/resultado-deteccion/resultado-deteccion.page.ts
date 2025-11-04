import { Component, OnInit } from '@angular/core';
import { Header } from '../../../../shared/components/header/header';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { ResultadoCard } from '../../components/resultado-card/resultado-card';
import { DeteccionResponse } from '../../../../core/models/deteccion.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultado-deteccion',
  standalone: true,
  imports: [CommonModule, Header, Breadcrumb, ResultadoCard],
  templateUrl: './resultado-deteccion.page.html',
  styleUrls: ['./resultado-deteccion.page.css']
})
export class ResultadoDeteccionPage implements OnInit {
  resultado: DeteccionResponse | null = null;

  ngOnInit() {
    const data = sessionStorage.getItem('ultimaDeteccion');
    if (data) {
      this.resultado = JSON.parse(data);
    }
  }
}
