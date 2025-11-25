import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Comunidad} from '../../services/comunidad';
import {Header} from '../../../../shared/components/header/header';
import {SidebarLeft} from '../../components/sidebar-left/sidebar-left';
import {SidebarSearch} from '../../components/sidebar-search/sidebar-search';
import {PostCard} from '../../components/post-card/post-card';
import {SidebarRecomendaciones} from '../../components/sidebar-recomendaciones/sidebar-recomendaciones';
import {SidebarTendencias} from '../../components/sidebar-tendencias/sidebar-tendencias';
import {NgOptimizedImage} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PostModal} from '../../components/post-modal/post-modal';
import {PostResponse} from '../../../../core/models/post.model';
import {UsuarioResponseForo} from '../../../../core/models/usuario.model';

@Component({
  selector: 'app-search',
  imports: [Header, SidebarLeft, SidebarSearch, PostCard, SidebarRecomendaciones, SidebarTendencias, NgOptimizedImage, PostModal],
  templateUrl: './search.page.html',
  styleUrl: './search.page.css',
})
export class SearchPage implements OnInit {

  private route = inject(ActivatedRoute);
  private comunidadService = inject(Comunidad);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  query = '';
  tab: 'destacado' | 'recientes' | 'personas' = 'destacado';

  postToEdit: any = null;
  showEditPost = false;

  posts: PostResponse[] = [];
  usuarios: UsuarioResponseForo[] = [];
  loading = true;

  ngOnInit() {

    window.addEventListener('refresh-search', () => {
      if (this.query.trim().length > 0) {
        this.buscar();
      }
    });

    this.route.paramMap.subscribe(params => {
      this.query = params.get('query') ?? '';
      this.tab = (params.get('tab') as any) ?? 'destacado';

      if (this.query.trim().length === 0) {
        this.loading = false;
        this.posts = [];
        this.usuarios = [];
        return;
      }

      this.buscar();
    });
  }

  cambiarTab(tab: string) {
    this.router.navigate(['/comunidad/search', this.query, tab]);
  }

  irAlPerfil(id: number) {
    this.router.navigate(['/comunidad/perfil', id]);
  }

  private buscar(): void {
    this.loading = true;

    this.comunidadService.buscar(this.query, this.tab).subscribe({
      next: res => {
        this.posts = res.posts ?? [];
        this.usuarios = res.usuarios ?? [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snack.open('Error al realizar la búsqueda', 'Cerrar', {duration: 3000,});
      },
    });
  }

  openEditPost(post: any) {
    this.postToEdit = post;
    this.showEditPost = true;
  }

  closeEditPost() {
    this.showEditPost = false;
    this.postToEdit = null;
  }

  onPostEdited(event: any) {
    this.comunidadService.updatePost(this.postToEdit.postId, event.dto, event.imagen
    ).subscribe({
      next: (updated) => {
        this.posts = this.posts.map(p =>
          p.postId === updated.postId ? updated : p
        );
        this.closeEditPost();

        this.snack.open('Publicación actualizada', 'Cerrar', {duration: 2500});
      }
    });
  }

}
