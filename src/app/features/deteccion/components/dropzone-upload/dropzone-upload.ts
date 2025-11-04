import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Deteccion } from '../../services/deteccion';
import { DeteccionResponse } from '../../../../core/models/deteccion.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropzone-upload',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './dropzone-upload.html',
  styleUrls: ['./dropzone-upload.css']
})
export class DropzoneUpload {
  private readonly deteccionService = inject(Deteccion);
  private readonly router = inject(Router);

  imagenSeleccionada: File | null = null;
  cargando = false;
  error: string | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.imagenSeleccionada = file;
      this.subirImagen();
    }
  }

  subirImagen(): void {
    if (!this.imagenSeleccionada) return;
    this.cargando = true;
    this.error = null;

    this.deteccionService.analizarCultivo(this.imagenSeleccionada).subscribe({
      next: (response: DeteccionResponse) => {
        this.cargando = false;
        sessionStorage.setItem('ultimaDeteccion', JSON.stringify(response));
        this.router.navigate(['/home/deteccion/resultado']);
      },
      error: (err) => {
        this.cargando = false;
        this.error = err.error?.message || 'Error al analizar la imagen.';
        console.error('Error de análisis:', err);
      }
    });
  }
}
