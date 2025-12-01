import {Component, computed, inject, signal} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {MatDialog} from '@angular/material/dialog';
import {ReleaseNotesDialog} from '../release-notes-dialog/release-notes-dialog';

@Component({
  selector: 'app-release-notes',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './release-notes.html',
  styleUrl: './release-notes.css',
})
export class ReleaseNotes {

  private dialog = inject(MatDialog);

  releaseNotes = signal([
    {
      version: 'v2.0',
      date: '01/12/2025',
      description: 'Esta versión consolida a EcoShield como una plataforma completa: renovamos la experiencia de comunidad, mejoramos el historial de diagnósticos y afinamos el motor de detección para que todo sea más fluido, útil y confiable.',
      items: [
        'Comunidad renovada: publicaciones, comentarios y navegación más claras y estables.',
        'Historial de fotos mejorado: acceso rápido a los diagnósticos anteriores y sus recomendaciones.',
        'Acceso directo a Capturas desde el header para subir fotos de forma más rápida.',
        'Gestión de usuarios optimizada: perfiles más consistentes y flujo de autenticación más robusto.',
        'Motor de detección afinado para diagnósticos más precisos y consistentes.',
        'Secciones de recomendaciones, blog y noticias totalmente funcionales e integradas.',
        'Mejoras generales de rendimiento, estabilidad y corrección de errores.',
        'Adaptación completa para resoluciones móviles y tablets.'
      ]
    },
    {
      version: 'v1.0',
      date: '20/08/2025',
      description: 'Estamos emocionados de anunciar la primera actualización de EcoShield.',
      items: [
        'Modelos de detección más rápidos y precisos.',
        'Navegación y accesibilidad mejoradas.',
        'Historial sobre los diagnósticos de las fotos.',
      ]
    }
  ]);

  latestNote = computed(() => this.releaseNotes()[0]);

  openAllNotes() {
    this.dialog.open(ReleaseNotesDialog, {
      width: '600px',
      data: this.releaseNotes()
    });
  }

}
