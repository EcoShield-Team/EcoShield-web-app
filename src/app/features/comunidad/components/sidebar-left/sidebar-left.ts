import { Component, inject } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import {filter} from 'rxjs';

@Component({
  selector: 'app-sidebar-left',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './sidebar-left.html',
  styleUrl: './sidebar-left.css',
})
export class SidebarLeft {

  private router = inject(Router);

  isHomeActive = false;
  isPerfilActive = false;
  isSearchActive = false;

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects as string;

        this.isHomeActive = url === '/comunidad';
        this.isPerfilActive = url.endsWith('/comunidad/perfil');
        this.isSearchActive = url.startsWith('/comunidad/search');
      });
  }

  onClickHome()  {
    const url = this.router.url;

    if (!url.endsWith('/comunidad')) {
      this.router.navigate(['/comunidad']);
      return;
    }

    if (window.scrollY > 5) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('refresh-feed'));
      return;
    }

    if (window.scrollY == 0) {
      this.router.navigate(['/comunidad']);
      return;
    }
  }

  onClickSearch() {
    const url = this.router.url;

    if (!url.startsWith('/comunidad/search')) {
      this.router.navigate(['/comunidad/search']);
      return;
    }

    if (window.scrollY > 5) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('refresh-search'));
      return;
    }

    if (window.scrollY == 0) {
      this.router.navigate(['/comunidad/search']);
      return;
    }
  }

  onClickPerfil() {
    const url = this.router.url;

    if (!url.endsWith('/comunidad/perfil')) {
      this.router.navigate(['/comunidad/perfil']);
      return;
    }

    if (window.scrollY > 5) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('refresh-profile'));
      return;
    }
  }

}
