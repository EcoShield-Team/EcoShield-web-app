import {Component, signal} from '@angular/core';
import {Header} from '../../../../shared/components/header/header';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';
import {SidebarLeft} from '../../components/sidebar-left/sidebar-left';
import {PostCreator} from '../../components/post-creator/post-creator';
import {PostCard} from '../../components/post-card/post-card';
import {PostResponse} from '../../../../core/models/post.model';
import {Comunidad} from '../../services/comunidad';
import {SidebarSearch} from '../../components/sidebar-search/sidebar-search';
import {SidebarRecomendaciones} from '../../components/sidebar-recomendaciones/sidebar-recomendaciones';
import {SidebarTendencias} from '../../components/sidebar-tendencias/sidebar-tendencias';

@Component({
  selector: 'app-feed',
  imports: [
    Header,
    Breadcrumb,
    SidebarLeft,
    PostCreator,
    PostCard,
    SidebarSearch,
    SidebarRecomendaciones,
    SidebarTendencias
  ],
  templateUrl: './feed.page.html',
  styleUrl: './feed.page.css',
})
export class FeedPage {
  posts = signal<PostResponse[]>([]);

  constructor(private comunidadService: Comunidad) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.comunidadService.getAll().subscribe({
      next: (data) => this.posts.set(data),
      error: (err) => console.error('Error al cargar posts:', err),
    });
  }

  agregarPost(newPost: PostResponse): void {
    this.posts.update((prev) => [newPost, ...prev]);
  }
}
