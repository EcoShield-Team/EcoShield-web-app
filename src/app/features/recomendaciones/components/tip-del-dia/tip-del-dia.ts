import {Component, inject, OnInit} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {MatProgressBar} from '@angular/material/progress-bar';
import {RouterLink} from '@angular/router';
import {ErrorView} from '../error-view/error-view';
import {Recomendaciones} from '../../services/recomendaciones';
import {BlogResponse} from '../../../../core/models/blog.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-tip-del-dia',
  imports: [
    MATERIAL_IMPORTS,
    MatProgressBar,
    RouterLink,
    ErrorView,
    NgIf
  ],
  templateUrl: './tip-del-dia.html',
  styleUrl: './tip-del-dia.css',
})
export class TipDelDia implements OnInit {

  private readonly recomendacionesService = inject(Recomendaciones);

  tipDelDia: BlogResponse | null = null;
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.loadTipDelDia();
  }

  loadTipDelDia(): void {
    this.isLoading = true;
    this.hasError = false;

    this.recomendacionesService.findTipDelDia().subscribe({
      next: (data) => {
        this.tipDelDia = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar el Tip del Día:', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  compartir() {
    console.log('Compartir Tip:', this.tipDelDia?.blogTitulo);
  }
  guardar() {
    console.log('Guardar Tip:', this.tipDelDia?.blogTitulo);
  }
}
