import {AfterViewInit, Component, ElementRef, inject, OnInit} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {NgOptimizedImage} from '@angular/common';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import {Router} from '@angular/router';
gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-hero',
  imports: [MATERIAL_IMPORTS, NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit, AfterViewInit {

  private router = inject(Router);

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  initAnimations(): void {
    const context = this.el.nativeElement;

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
        duration: 1.5
      }
    });

    tl.to(context.querySelector('.gsap-leaf'), {
      opacity: 1,
      x: 0,
      rotation: 20,
      duration: 1.5
    });

    tl.to(context.querySelector('.hero-left-content .gsap-fade-up'), {
      opacity: 1,
      y: 0
    }, "-=1.2");

    tl.to(context.querySelector('.main-title.gsap-fade-up'), {
      opacity: 1,
      y: 0
    }, "-=1.0");

    const descriptionEl = context.querySelector('.main-description.gsap-fade-up');
    const descriptionText = descriptionEl.textContent;
    descriptionEl.textContent = '';

    tl.to(descriptionEl, {
      opacity: 1,
      y: 0,
      text: descriptionText,
      duration: 0.5,
      ease: 'none'
    }, "-=1.2");

    tl.to(context.querySelectorAll('.upload-box.gsap-fade-up, .upload-info.gsap-fade-up'), {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 1
    }, "-=1.0");
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    this.router.navigate(['/auth'], { queryParams: { view: 'register' } });
  }
}
