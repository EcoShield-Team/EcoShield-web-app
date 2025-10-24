import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../shared/material/material.imports';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  featureCards = signal([
    { title: 'Almanaque de enfermedades', description: 'Consulta el catálogo actualizado', icon: 'book_outline', color: 'color-green' },
    { title: 'Detectar salud de cultivos', description: 'Analiza imágenes para evaluar vigor', icon: 'qr_code_scanner', color: 'color-blue' },
    { title: 'Foro de comunidad', description: 'Comparte dudas y aprende', icon: 'forum', color: 'color-purple' },
    { title: 'Recomendaciones de hoy', description: 'Acciones sugeridas según clima', icon: 'lightbulb', color: 'color-yellow' },
    { title: 'Historial de fotos', description: 'Explora capturas anteriores', icon: 'history', color: 'color-indigo' },
    { title: 'Enviar Feedback', description: 'Cuéntanos cómo mejorar EcoShield', icon: 'send', color: 'color-pink' },
  ]);

  historyItems = signal([
    { title: 'Parcela Lote A - hoja manchada', subtitle: 'Foto - 2024-08-20', status: 'Posible roya', statusClass: 'status-warning' },
    { title: 'Mildiu confirmado en Tomate', subtitle: 'Diagnóstico - 2024-08-18', status: 'Tratado', statusClass: 'status-success' },
    { title: 'Sensor NDVI - estrés hídrico leve', subtitle: 'Foto - 2024-08-16', status: 'Revisar riego', statusClass: 'status-info' },
  ]);

  releaseNotes = signal({
    version: 'v 1.0',
    date: '20/08/2025',
    description: 'Estamos emocionados de anunciar la primera actualización de EcoShield: su nuevo asistente de diagnóstico y correcciones de estabilidad.',
    items: [
      'Modelos de detección más rápidos y precisos.',
      'Navegación y accesibilidad mejoradas.',
      'Historial sobre los diagnósticos de las fotos.',
    ]
  });
}
