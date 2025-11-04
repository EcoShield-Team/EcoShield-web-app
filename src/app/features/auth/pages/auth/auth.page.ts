import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {ActivatedRoute, Router} from '@angular/router';
import {gsap} from 'gsap';
import {AuthView, Modal} from '../../components/modal/modal';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MATERIAL_IMPORTS, Modal],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.css',
})
export class AuthPage implements AfterViewInit {

  @ViewChild(Modal) modal!: Modal;
  constructor(private router: Router, private route: ActivatedRoute, private el: ElementRef) { }

  ngAfterViewInit(): void {

    const nativeEl = this.el.nativeElement;

    const letters = nativeEl.querySelectorAll('.logo-text .letter');

    letters.forEach((letter: Element) => {

      letter.addEventListener('mouseenter', () => {
        gsap.to(letter, {
          y: -15,
          duration: 0.2,
          ease: "power2.out",
          overwrite: true
        });
      });

      letter.addEventListener('mouseleave', () => {
        gsap.to(letter, {
          y: 0,
          duration: 0.4,
          ease: "bounce.out",
          overwrite: true
        });
      });
    });

    this.route.queryParams.subscribe(params => {
      const view = (params['view'] as AuthView) || 'login';

      setTimeout(() => {
        if (view === 'register' || view === 'login') {
          this.modal.open(view);
        }
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
    this.modal.open('login');
  }
}
