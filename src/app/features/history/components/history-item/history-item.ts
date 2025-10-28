import {Component, Input} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-history-item',
  imports: [
    MATERIAL_IMPORTS
  ],
  templateUrl: './history-item.html',
  styleUrl: './history-item.css',
})
export class HistoryItem {
  @Input() item!: { title: string; subtitle: string; status: string; statusClass: string };
}
