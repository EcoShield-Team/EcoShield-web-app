import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import {filter} from 'rxjs';
import {MATERIAL_IMPORTS} from '../../material/material.imports';
import {Auth} from '../../../features/auth/services/auth';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterModule, MATERIAL_IMPORTS],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb {
  breadcrumbs: { label: string; url: string }[] = [];
  isLoggedIn = false;

  constructor(private router: Router, private route: ActivatedRoute, private auth: Auth) {
    this.isLoggedIn = this.auth.isLoggedIn();

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.buildBreadcrumb();
      });
  }

  buildBreadcrumb() {
    const segments = this.router.url.split('/').filter(Boolean);

    const filtered: string[] = [];
    for (let i = 0; i < segments.length; i++) {
      filtered.push(segments[i]);
      if (segments[i] === 'enfermedad') break;
      if (segments[i] === 'plaga') break;
      if (segments[i] === 'detalle') break;
    }

    this.breadcrumbs = filtered.map((seg, i) => ({
      label: this.formatLabel(seg),
      url: '/' + filtered.slice(0, i + 1).join('/'),
    }));
  }



  private formatLabel(segment: string): string {
    return segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }
}
