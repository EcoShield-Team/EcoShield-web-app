import {Component, inject, OnInit} from '@angular/core';
import {Recomendaciones} from '../../services/recomendaciones';
import {BlogResponse} from '../../../../core/models/blog.model';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgForOf, NgIf} from '@angular/common';
import {BlogListCard} from '../../components/blog-list-card/blog-list-card';
import {RouterLink} from '@angular/router';
import {Header} from '../../../../shared/components/header/header';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-tip-list-page',
  imports: [
    MatProgressSpinner,
    NgIf,
    BlogListCard,
    NgForOf,
    RouterLink,
    Header,
    Breadcrumb,
    MatButton
  ],
  templateUrl: './tip-list-page.html',
  styleUrl: './tip-list-page.css',
})
export class TipListPage implements OnInit {
  private readonly recomendacionesService = inject(Recomendaciones);

  listaTips: BlogResponse[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.loadTips();
  }

  loadTips(): void {
    this.isLoading = true;
    this.hasError = false;

    this.recomendacionesService.findAllBlogs().subscribe({
      next: (data) => {
        this.listaTips = data.filter(blog =>
          blog.blogTipo === 'TIP' && blog.blogEstado === 'ACTIVO'
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar la lista de Tips:', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}
