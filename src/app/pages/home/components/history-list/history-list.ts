import {Component, signal} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-history-list',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './history-list.html',
  styleUrl: './history-list.css',
})
export class HistoryList {
  historyItems = signal([
    { title: 'Parcela Lote A - hoja manchada', subtitle: 'Foto - 2024-08-20', status: 'Posible roya', statusClass: 'status-warning' },
    { title: 'Mildiu confirmado en Tomate', subtitle: 'Diagnóstico - 2024-08-18', status: 'Tratado', statusClass: 'status-success' },
    { title: 'Sensor NDVI - estrés hídrico leve', subtitle: 'Foto - 2024-08-16', status: 'Revisar riego', statusClass: 'status-info' },
  ]);
}
