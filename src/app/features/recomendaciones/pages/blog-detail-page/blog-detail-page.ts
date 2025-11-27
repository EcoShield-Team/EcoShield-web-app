import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Recomendaciones} from '../../services/recomendaciones';
import {BlogResponse} from '../../../../core/models/blog.model';
import {Header} from '../../../../shared/components/header/header';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {DatePipe, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-blog-detail-page',
  imports: [
    Header,
    MatProgressSpinner,
    NgIf,
    MatIcon,
    DatePipe,
    RouterLink,
    MatButton,
    Breadcrumb
  ],
  templateUrl: './blog-detail-page.html',
  styleUrl: './blog-detail-page.css',
  standalone: true,
})
export class BlogDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogService = inject(Recomendaciones);

  blog!: BlogResponse;
  isLoading: boolean = true;
  blogId!: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString) {
        this.blogId = +idString;
        this.loadBlogDetail(this.blogId);
      } else {
        this.isLoading = false;
        this.router.navigate(['/recomendaciones']);
      }
    });
  }

  loadBlogDetail(id: number): void {
    this.isLoading = true;
    this.blogService.findByIdAdmin(id).subscribe({
      next: (data) => {
        this.blog = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar el detalle del blog:', err);
        this.isLoading = false;
        this.router.navigate(['/recomendaciones']);
      }
    });
  }

}
