import {Component, inject} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar-recomendaciones',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './sidebar-recomendaciones.html',
  styleUrl: './sidebar-recomendaciones.css',
})
export class SidebarRecomendaciones {
  private router = inject(Router);

  verDetalle(id: number) {
    this.router.navigate(['/recomendaciones/detalle', id]);
  }
}
