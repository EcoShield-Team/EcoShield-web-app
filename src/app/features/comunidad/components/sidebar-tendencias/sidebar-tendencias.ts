import {Component, inject} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar-tendencias',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './sidebar-tendencias.html',
  styleUrl: './sidebar-tendencias.css',
})
export class SidebarTendencias {
  private router = inject(Router);

  buscar(query: string) {
    this.router.navigate(['/comunidad/search', query, 'destacado']);
  }
}
