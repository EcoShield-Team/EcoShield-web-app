import {Component, computed, effect, inject, signal} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {HistoryItem} from '../../components/history-item/history-item';
import {Header} from '../../../../shared/components/header/header';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';
import {History} from '../../services/history';
import {DeteccionResponse} from '../../../../core/models/deteccion.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [MATERIAL_IMPORTS, HistoryItem, Header, Breadcrumb, DatePipe],
  templateUrl: './history.page.html',
  styleUrl: './history.page.css',
})
export class HistoryPage {
  private historyService = inject(History);

  detecciones = signal<DeteccionResponse[]>([]);
  page = signal(1);
  perPage = 5;

  constructor() {
    effect(() => {
      this.historyService.getHistorial().subscribe({
        next: (data) => this.detecciones.set(data),
        error: (err) => console.error('Error al cargar historial', err),
      });
    });
  }

  totalPages = computed(() =>
    Array(Math.ceil(this.detecciones().length / this.perPage)).fill(0)
  );

  paginatedHistory = computed(() => {
    const start = (this.page() - 1) * this.perPage;
    return this.detecciones().slice(start, start + this.perPage);
  });

  nextPage() { if (this.page() < this.totalPages().length) this.page.update(p => p + 1); }
  prevPage() { if (this.page() > 1) this.page.update(p => p - 1); }
  goToPage(num: number) { this.page.set(num); }
}
