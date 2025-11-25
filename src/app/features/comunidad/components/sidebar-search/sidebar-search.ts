import { Component } from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-sidebar-search',
  imports: [MATERIAL_IMPORTS, FormsModule],
  templateUrl: './sidebar-search.html',
  styleUrl: './sidebar-search.css',
})
export class SidebarSearch {

  constructor(private router: Router) {}

  query = '';

  buscar() {
    if (!this.query.trim()) return;
    this.router.navigate(['/comunidad/search', this.query, 'destacado']);
  }
}
