import {Component, signal} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-release-notes',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './release-notes.html',
  styleUrl: './release-notes.css',
})
export class ReleaseNotes {
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
