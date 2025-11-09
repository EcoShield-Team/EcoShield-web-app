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

    gsap.to(context.querySelector('#plant-col-1'), {
      y: -1500,
      ease: "none",
      scrollTrigger: {
        trigger: triggerEl,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(context.querySelector('#plant-col-2'), {
      y: -500,
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
