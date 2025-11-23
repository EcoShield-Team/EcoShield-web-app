import {Component, effect, inject, signal} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {RouterLink} from '@angular/router';
import {History} from '../../../../features/history/services/history';
import {HistoryItem} from '../../../../features/history/components/history-item/history-item';
import {DeteccionResponse} from '../../../../core/models/deteccion.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-history-list',
  imports: [MATERIAL_IMPORTS, RouterLink, HistoryItem, DatePipe],
  templateUrl: './history-list.html',
  styleUrl: './history-list.css',
})
export class HistoryList {
  private historyService = inject(History);

  detecciones = signal<DeteccionResponse[]>([]);

  constructor() {
    effect(() => {
      this.historyService.getHistorial().subscribe({
        next: (data) => this.detecciones.set(data),
        error: (err) => console.error('Error al cargar historial', err),
      });
    });
  }

}
