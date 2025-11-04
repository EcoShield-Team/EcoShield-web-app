import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Header } from '../../../../shared/components/header/header';
import { AlmanaqueCard } from '../../components/almanaque-card/almanaque-card';
import { FilterSidebar } from '../../components/filter-sidebar/filter-sidebar';
import { AlmanaqueService} from '../../services/almanaque';
import { EnfermedadList} from '../../../../core/models/enfermedad.model';
import { PlagaList} from '../../../../core/models/plaga.model';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-almanaque',
  standalone: true,
  imports: [CommonModule, HttpClientModule, Header, AlmanaqueCard, FilterSidebar, Breadcrumb, FormsModule],
  templateUrl: './almanaque.page.html',
  styleUrls: ['./almanaque.page.css'],
})
export class AlmanaquePage implements OnInit {
  enfermedades: EnfermedadList[] = [];
  plagas: PlagaList[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  ordenSeleccionada: string = 'NOMBRE_ASC'

  constructor(private almanaqueService: AlmanaqueService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.almanaqueService.getEnfermedades().subscribe({
      next: (data) => {
        this.enfermedades = data;
      },
      error: (err) => console.error('Error cargando enfermedades', err),
    });

    this.almanaqueService.getPlagas().subscribe({
      next: (data) => {
        this.plagas = data;
      },
      error: (err) => console.error('Error cargando plagas', err),
    });
  }

  aplicarFiltro(event: { category: string, value: string }) {
    switch (event.category) {
      case 'tipo':
        this.almanaqueService.getEnfermedadesTipo(event.value)
          .subscribe(data => this.enfermedades = data);
        this.almanaqueService.getPlagasTipo(event.value)
          .subscribe(data => this.plagas = data);
        break;

      case 'temporada':
        this.almanaqueService.getEnfermedadesTemporada(event.value)
          .subscribe(data => this.enfermedades = data);
        this.almanaqueService.getPlagasTemporada(event.value)
          .subscribe(data => this.plagas = data);
        break;

      case 'severidad':
        this.almanaqueService.getEnfermedadesSeveridad(event.value)
          .subscribe(data => this.enfermedades = data);
        this.almanaqueService.getPlagasSeveridad(event.value)
          .subscribe(data => this.plagas = data);
        break;
    }
  }

  resetFiltros() {
    this.cargarDatos();
  }

  ordenarASCDESC() {
    const orden = this.ordenSeleccionada;

    if (orden === 'NOMBRE_ASC') {
      this.almanaqueService.getEnfermedadesOrdenadasASC().subscribe({
        next: (data) => this.enfermedades = data,
        error: (err) => console.error('Error ordenando enfermedades ASC', err)
      });

      this.almanaqueService.getPlagasOrdenadasASC().subscribe({
        next: (data) => this.plagas = data,
        error: (err) => console.error('Error ordenando plagas ASC', err)
      });

    }
    else if (orden === 'NOMBRE_DESC') {
      this.almanaqueService.getEnfermedadesOrdenadasDESC().subscribe({
        next: (data) => this.enfermedades = data,
        error: (err) => console.error('Error ordenando enfermedades DESC', err)
      });

      this.almanaqueService.getPlagasOrdenadasDESC().subscribe({
        next: (data) => this.plagas = data,
        error: (err) => console.error('Error ordenando plagas DESC', err)
      });
    }
  }

  buscarEnAlmanaque() {
    const termino = this.searchTerm.trim();
    if (termino.length === 0) {
      this.cargarDatos();
      return;
    }

    this.loading = true;

    this.almanaqueService.getEnfermedadesPorNombre(termino.toLowerCase()).subscribe({
      next: enfermedades => this.enfermedades = enfermedades,
      error: err => console.error(err),
      complete: () => this.loading = false
    });

    this.almanaqueService.getPlagasPorNombre(termino.toLowerCase()).subscribe({
      next: plagas => this.plagas = plagas,
      error: err => console.error(err)
    });
  }
}
