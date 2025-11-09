import {Component, signal, computed} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  faqItems = signal([
    {
      question: '¿Qué es EcoShield?',
      answer: [
        'EcoShield es una plataforma inteligente que detecta plagas y enfermedades en tus plantas mediante análisis de imágenes.',
        'Además, ofrece un almanaque interactivo, una comunidad de apoyo y recomendaciones personalizadas para el cuidado de tus cultivos.',
      ],
    },
    {
      question: '¿EcoShield está disponible gratis?',
      answer: [
        'Sí. Puedes usar EcoShield de forma gratuita con funciones básicas como detección de plagas, acceso limitado al almanaque y consejos diarios.',
        'Si deseas análisis avanzados, historial de diagnósticos y acceso completo a la comunidad, puedes optar por el plan EcoShield Premium.',
      ],
    },
    {
      question: '¿Qué incluye el plan Premium?',
      answer: [
        'El plan Premium ofrece diagnósticos más precisos, seguimiento de tus plantas, historial de fotos, alertas personalizadas y acceso ilimitado al almanaque de plagas y enfermedades.',
      ],
    },
    {
      question: '¿Dónde está disponible EcoShield?',
      answer: [
        'EcoShield está disponible en todo el mundo a través de la web. Solo necesitas conexión a internet y una cuenta de usuario para acceder a todas las herramientas.',
      ],
    },
    {
      question: '¿Puedo usar EcoShield sin experiencia en agricultura?',
      answer: [
        'Por supuesto. EcoShield está diseñado para todo tipo de usuarios, desde aficionados hasta agricultores profesionales.',
        'Las recomendaciones se adaptan automáticamente según tu nivel de conocimiento.',
      ],
    },
    {
      question: '¿Mis datos y fotos están seguros?',
      answer: [
        'Sí. EcoShield protege tu información y las imágenes que subas mediante encriptación y políticas de privacidad estrictas.',
        'Tus datos no se comparten sin tu consentimiento.',
      ],
    },
  ]);

  openedStates = signal<boolean[]>(Array(this.faqItems().length).fill(false));

  toggle(index: number) {
    this.openedStates.update(arr => {
      const next = [...arr];
      next[index] = !next[index];
      return next;
    });
  }

  isOpen(index: number) {
    return computed(() => this.openedStates()[index]);
  }
}
