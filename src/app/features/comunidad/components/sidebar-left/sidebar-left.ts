import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-sidebar-left',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './sidebar-left.html',
  styleUrl: './sidebar-left.css',
})
export class SidebarLeft {

  private router = inject(Router);

  goHome() {
    const currentUrl = this.router.url;

    if (currentUrl.startsWith('/home')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('refresh-home-feed'));
      return;
    }

    this.router.navigate(['/home']);
  }
}
