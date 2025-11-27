import {Component, inject, OnInit} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {Recomendaciones} from '../../services/recomendaciones';
import {BlogResponse} from '../../../../core/models/blog.model';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-noticias-list',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './noticias-list.html',
  styleUrl: './noticias-list.css',
})
export class NoticiasList implements OnInit {
  private readonly recomendacionesService = inject(Recomendaciones);

  noticiasPrincipales: BlogResponse[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.loadNoticias();
  }

  loadNoticias(): void {
    this.isLoading = true;
    this.hasError = false;

    this.recomendacionesService.findAllNews().subscribe({
      next: (data) => {
        // 💡 Lógica crucial: Tomar solo las 3 primeras noticias
        this.noticiasPrincipales = data.slice(0, 3);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar la lista de noticias:', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}
