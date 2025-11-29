import {Component, Input} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-history-item',
  imports: [
    MATERIAL_IMPORTS,
    RouterLink
  ],
  templateUrl: './history-item.html',
  styleUrl: './history-item.css',
})
export class HistoryItem {
  @Input() item!: {
    id: number;
    title: string;
    subtitle: string;
    status: string;
    statusClass: string;
  };

}
