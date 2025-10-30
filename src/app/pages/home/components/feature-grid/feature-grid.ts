import {Component, signal} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-feature-grid',
  imports: [MATERIAL_IMPORTS, RouterLink],
  templateUrl: './feature-grid.html',
  styleUrl: './feature-grid.css',
})
export class FeatureGrid {
  featureCards = signal([
    { title: 'Almanaque de enfermedades', description: 'Consulta el catálogo actualizado', icon: 'book', color: 'color-green', route: '/home/almanaque' },
    { title: 'Detectar salud de cultivos', description: 'Analiza imágenes para evaluar vigor', icon: 'qr_code_scanner', color: 'color-blue', route: '/home/deteccion' },
    { title: 'Foro de comunidad', description: 'Comparte dudas y aprende', icon: 'forum', color: 'color-purple', route: '/home/comunidad' },
    { title: 'Recomendaciones de hoy', description: 'Acciones sugeridas según clima', icon: 'lightbulb', color: 'color-yellow', route: '/home/recomendaciones' },
    { title: 'Historial de fotos', description: 'Explora capturas anteriores', icon: 'history', color: 'color-indigo', route: '/home/history' },
    { title: 'Enviar Feedback', description: 'Cuéntanos cómo mejorar EcoShield', icon: 'send', color: 'color-pink', route: '/home/feedback' },
  ]);
}
