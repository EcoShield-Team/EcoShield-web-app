import {Component, computed, signal} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {HistoryItem} from '../../components/history-item/history-item';
import {Header} from '../../../../shared/components/header/header';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-history',
  imports: [MATERIAL_IMPORTS, HistoryItem, Header, Breadcrumb],
  templateUrl: './history.page.html',
  styleUrl: './history.page.css',
})
export class HistoryPage {
  items = signal([
    { title: 'Parcela Lote A - hoja manchada', subtitle: 'Foto - 2024-08-20', status: 'Posible roya', statusClass: 'status-warning' },
    { title: 'Mildiu confirmado en Tomate', subtitle: 'Diagnóstico - 2024-08-18', status: 'Tratado', statusClass: 'status-success' },
    { title: 'Sensor NDVI - estrés hídrico leve', subtitle: 'Foto - 2024-08-16', status: 'Revisar riego', statusClass: 'status-info' },
    { title: 'Mildiu confirmado en Tomate', subtitle: 'Diagnóstico - 2024-08-06', status: 'Tratado', statusClass: 'status-success' },
    { title: 'Sensor NDVI - estrés hídrico leve', subtitle: 'Foto - 2024-07-24', status: 'Revisar riego', statusClass: 'status-info' },
    { title: 'Mildiu confirmado en Tomate', subtitle: 'Diagnóstico - 2024-06-19', status: 'Tratado', statusClass: 'status-success' },
  ]);

  page = signal(1);
  perPage = 5;
  totalPages = computed(() => Array(Math.ceil(this.items().length / this.perPage)).fill(0));

  paginatedHistory = computed(() => {
    const start = (this.page() - 1) * this.perPage;
    return this.items().slice(start, start + this.perPage);
  });

  nextPage() { if (this.page() < this.totalPages().length) this.page.update(p => p + 1); }
  prevPage() { if (this.page() > 1) this.page.update(p => p - 1); }
  goToPage(num: number) { this.page.set(num); }
}
