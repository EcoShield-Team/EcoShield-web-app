import {Component, inject, OnInit} from '@angular/core';
import {Recomendaciones} from '../../services/recomendaciones';
import {BlogResponse} from '../../../../core/models/blog.model';
import {Header} from '../../../../shared/components/header/header';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {BlogListCard} from '../../components/blog-list-card/blog-list-card';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-news-list-page',
  imports: [
    Header,
    Breadcrumb,
    MatProgressSpinner,
    BlogListCard,
    RouterLink,
    MatButton,
    NgIf,
    NgForOf
  ],
  templateUrl: './news-list-page.html',
  styleUrl: './news-list-page.css',
})
export class NewsListPage implements OnInit {
  private readonly recomendacionesService = inject(Recomendaciones);

  listaNoticias: BlogResponse[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.isLoading = true;
    this.hasError = false;

    this.recomendacionesService.findAllBlogs().subscribe({
      next: (data) => {
        this.listaNoticias = data.filter(blog =>
          blog.blogTipo === 'NEWS' && blog.blogEstado === 'ACTIVO'
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar la lista de Noticias:', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}
