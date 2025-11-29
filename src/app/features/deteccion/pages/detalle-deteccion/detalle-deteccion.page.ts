import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Deteccion} from '../../services/deteccion';
import {DeteccionResponse} from '../../../../core/models/deteccion.model';
import {Header} from '../../../../shared/components/header/header';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';
import {ResultadoCard} from '../../components/resultado-card/resultado-card';

@Component({
  selector: 'app-detalle-deteccion',
  imports: [Header, Breadcrumb, ResultadoCard],
  templateUrl: './detalle-deteccion.page.html',
  styleUrl: './detalle-deteccion.page.css',
})
export class DetalleDeteccionPage {

  private readonly route = inject(ActivatedRoute);
  private readonly deteccionService = inject(Deteccion);

  resultado: DeteccionResponse | null = null;
  loading = true;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.deteccionService.obtenerResultado(id).subscribe({
      next: (data) => {
        this.resultado = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Error al obtener la detección.');
      }
    });
  }
}
