import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './testimonial.html',
  styleUrls: ['./testimonial.css'],
})
export class Testimonial implements OnInit, AfterViewInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (gsap) {
      this.initAnimations();
    }
  }

  initAnimations(): void {
    const context = this.el.nativeElement;
    const triggerEl = context.querySelector('.testimonial-grid');

    // --- ¡ANIMACIÓN CORREGIDA Y SIMPLIFICADA! ---

    // 1. Columna 1 (plantas 1, 3, 5) se mueve HACIA ARRIBA
    //    Para "más movimiento", aumenté el valor de -150 a -250
    gsap.to(context.querySelector('#plant-col-1'), {
      y: -1500, // <-- MÁS MOVIMIENTO (hacia arriba)
      ease: "none",
      scrollTrigger: {
        trigger: triggerEl,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // 2. Columna 2 (plantas 2, 4, 6) se mueve HACIA ABAJO
    //    Usamos un valor 'y' positivo para moverla en la dirección opuesta
    gsap.to(context.querySelector('#plant-col-2'), {
      y: -500, // <-- MÁS MOVIMIENTO (hacia arriba)
      ease: "none",
      scrollTrigger: {
        trigger: triggerEl,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }
}
