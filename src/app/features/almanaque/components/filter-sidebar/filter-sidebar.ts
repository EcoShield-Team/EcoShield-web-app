import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-sidebar.html',
  styleUrls: ['./filter-sidebar.css']
})

export class FilterSidebar {

  @Output() filterChange = new EventEmitter<{ category: string, value: string }>();
  @Output() resetFilters = new EventEmitter<void>()

  openSection: string | null = null;

  tipos: string[] = ['HONGO', 'BACTERIA', 'VIRUS', 'NEMATODO', 'OTRO', 'INSECTO', 'ACARO'];
  temporadas: string[] = ['PRIMAVERA', 'VERANO', 'OTOÑO', 'INVIERNO', 'TODO EL AÑO'];
  severidades: string[] = ['LEVE', 'MODERADA', 'GRAVE'];

  toggleSection(section: string): void {
    this.openSection = this.openSection === section ? null : section;
  }

  onFilterSelect(category: string, value: string): void {
    this.filterChange.emit({ category, value });
  }

  resetFiltros() {
    this.resetFilters.emit();
  }
}
