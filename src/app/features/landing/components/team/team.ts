import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

@Component({
  selector: 'app-team',
  imports: [CommonModule,NgOptimizedImage],
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const ring = this.el.nativeElement.querySelector('#teamRing');

    const scrollTween = gsap.to(ring, {
      rotation: 560,
      ease: 'none',
      scrollTrigger: {
        trigger: ring,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    const st = scrollTween.scrollTrigger;

    const enableOnScroll = () => {
      if (st) {
        st.enable();
      }
      window.removeEventListener('scroll', enableOnScroll);
    };

    Draggable.create(ring, {
      type: 'rotation',
      inertia: true,
      edgeResistance: 0.85,
      throwProps: true,
      dragResistance: 0.4,

      onDragStart: function () {
        if (st) {
          st.disable();
        }
        window.removeEventListener('scroll', enableOnScroll);
      },

      onDragEnd: function() {
        if (!this["tween"] || !this["tween"].isActive()) {
          window.addEventListener('scroll', enableOnScroll);
        }
      },

      onThrowComplete: function() {
        window.addEventListener('scroll', enableOnScroll);
      }

    });

  }
}
