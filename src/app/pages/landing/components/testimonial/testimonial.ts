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
    const ctx = this.el.nativeElement;
    const triggerEl = ctx.querySelector('.testimonial-grid');

    const col1 = ctx.querySelector('#plant-col-1');
    const col2 = ctx.querySelector('#plant-col-2');

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1200;

    const move1 = isMobile ? -600 : isTablet ? -1200 : -1500;
    const move2 = isMobile ? -200 : isTablet ? -650 : -500;

    const start = "top bottom";
    const end = "bottom top";

    gsap.to(col1, {
      y: move1,
      ease: "none",
      scrollTrigger: {
        trigger: triggerEl,
        start,
        end,
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    gsap.to(col2, {
      y: move2,
      ease: "none",
      scrollTrigger: {
        trigger: triggerEl,
        start,
        end,
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    ScrollTrigger.refresh();
  }

}
