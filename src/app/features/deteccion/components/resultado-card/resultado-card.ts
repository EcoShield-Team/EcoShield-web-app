import { Component, Input } from '@angular/core';
import { DeteccionResponse } from '../../../../core/models/deteccion.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-resultado-card',
  templateUrl: './resultado-card.html',
  styleUrls: ['./resultado-card.css'],
  imports: [CommonModule]
})
export class ResultadoCard {
  @Input() data: DeteccionResponse | null = null;
  tab: string = 'sintomas';
  showImageModal = false;
  selectedImage: string | null = null;

  openImage(url: string, event: Event) {
    event.stopPropagation();
    this.selectedImage = url;
    this.showImageModal = true;
  }

  closeImage() {
    this.showImageModal = false;
    this.selectedImage = null;
  }

  get estadoDeteccion(): 'error' | 'sano' | 'problema' {
    if (!this.data) return 'error';

    const texto = `
    ${this.data.descripcion || ''}
    ${this.data.nombreDetectado || ''}
    ${this.data.sintomas || ''}
    ${this.data.tratamiento || ''}
    ${this.data.causas || ''}
    ${this.data.prevencion || ''}
  `.toLowerCase();

    const patronesInvalidos = [
      'no corresponde a una planta',
      'no corresponde a un cultivo',
      'no corresponde a una hoja',
      'no es una planta',
      'no es un cultivo',
      'no es una hoja',
      'no muestra una planta',
      'no muestra planta',
      'no contiene una planta',
      'no contiene planta',
      'no contiene un cultivo',
      'no es posible identificar',
      'ninguna plaga o enfermedad',
      'imagen no contiene',
      'no aplica: la imagen no muestra una planta'
    ];

    if (patronesInvalidos.some(p => texto.includes(p))) {
      return 'error';
    }

    const patronesSano = [
      'ninguna plaga o enfermedad detectada',
      'no se detectaron plagas o enfermedades',
      'no se detectó plaga ni enfermedad',
      'sin signos de daños',
      'aspecto saludable'
    ];

    if (patronesSano.some(p => texto.includes(p))) {
      return 'sano';
    }

    if (this.data.tipo === 'ENFERMEDAD' || this.data.tipo === 'PLAGA') {
      return 'problema';
    }

    return 'sano';
  }


}
