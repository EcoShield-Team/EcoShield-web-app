import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Deteccion} from '../../services/deteccion';
import {DeteccionResponse} from '../../../../core/models/deteccion.model';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {Header} from '../../../../shared/components/header/header';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-capturas',
  imports: [RouterLink, MATERIAL_IMPORTS, Header, DatePipe],
  templateUrl: './capturas.page.html',
  styleUrl: './capturas.page.css',
})
export class CapturasPage implements OnInit{

  private readonly deteccionService = inject(Deteccion);

  historial: DeteccionResponse[] = [];
  loading = true;
  showImageModal = false;
  selectedImage: string | null = null;

  ngOnInit() {
    this.deteccionService.listarHistorial().subscribe({
      next: (data) => {
        this.historial = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Ocurrió un error al cargar las capturas.');
      }
    });
  }

  openImage(url: string, event: Event) {
    event.stopPropagation();
    this.selectedImage = url;
    this.showImageModal = true;
  }

  closeImage() {
    this.showImageModal = false;
    this.selectedImage = null;
  }
}
