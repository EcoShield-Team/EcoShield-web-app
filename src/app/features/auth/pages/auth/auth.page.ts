import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {Router} from '@angular/router';
import {gsap} from 'gsap';
import {Modal} from '../../components/modal/modal';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MATERIAL_IMPORTS, Modal],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.css',
})
export class AuthPage implements AfterViewInit {

  @ViewChild(Modal) modal!: Modal;
  constructor(private router: Router, private el: ElementRef) { }

  ngAfterViewInit(): void {

    const nativeEl = this.el.nativeElement;

    // Obtenemos TODAS las letras
    const letters = nativeEl.querySelectorAll('.logo-text .letter');

    if (letters.length === 0) {
      console.error('Error de animación: No se pudo encontrar ".letter".');
      return;
    }

    // --- (CAMBIO RADICAL) ---
    // Ya no usamos el 'logoTextContainer'.
    // En su lugar, iteramos sobre CADA letra una por una.

    letters.forEach((letter: Element) => {

      // 1. Añadimos un listener para cuando el mouse ENTRA en esta letra
      letter.addEventListener('mouseenter', () => {
        // Animamos SÓLO esta letra hacia arriba
        gsap.to(letter, {
          y: -15, // Sube
          duration: 0.2,
          ease: "power2.out",
          overwrite: true // Si el mouse sale y entra rápido, no se rompe
        });
      });

      // 2. Añadimos un listener para cuando el mouse SALE de esta letra
      letter.addEventListener('mouseleave', () => {
        // Animamos SÓLO esta letra de vuelta a su sitio
        gsap.to(letter, {
          y: 0, // Baja
          duration: 0.4,
          ease: "bounce.out", // Con un rebote
          overwrite: true
        });
      });

    });
  }

  goToHome(): void {
    console.log('Navegando a la página de inicio...');
    this.router.navigate(['']);
  }

  openRegisterModal(): void {
    this.modal.open('register');
  }

  openLoginModal(): void {
    this.modal.open('login'); // Le dice al modal que abra la vista 'login'
  }
}
