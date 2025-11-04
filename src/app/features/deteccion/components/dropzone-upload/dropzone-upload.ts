import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Deteccion } from '../../services/deteccion';
import { DeteccionResponse } from '../../../../core/models/deteccion.model';
import { CommonModule } from '@angular/common';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-dropzone-upload',
  standalone: true,
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: './dropzone-upload.html',
  styleUrls: ['./dropzone-upload.css']
})
export class DropzoneUpload {
  private readonly deteccionService = inject(Deteccion);
  private readonly router = inject(Router);

  imagenSeleccionada: File | null = null;
  cargando = false;

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase();
    const formatosValidos = ['jpg', 'jpeg', 'png'];

    if (!ext || !formatosValidos.includes(ext)) {
      alert('Solo se permiten imágenes en formato JPG, JPEG o PNG.');
      return;
    }

    this.imagenSeleccionada = file;
    this.subirImagen();
  }

  subirImagen(): void {
    if (!this.imagenSeleccionada) return;
    this.cargando = true;

    this.deteccionService.analizarCultivo(this.imagenSeleccionada).subscribe({
      next: (response: DeteccionResponse) => {
        this.cargando = false;
        sessionStorage.setItem('ultimaDeteccion', JSON.stringify(response));
        this.router.navigate(['/home/deteccion/resultado']);
      },
      error: (err) => {
        this.cargando = false;

        if (err.error?.message?.includes('borrosa')) {
          alert('La imagen ha salido en movimiento. Vuelve a cargar otra foto.');
        } else {
          alert(err.error?.message || 'Error al analizar la imagen.');
        }

        console.error('Error de análisis:', err);
      }
    });
  }
}
