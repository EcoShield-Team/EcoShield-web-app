import {Component, inject} from '@angular/core';
import {Recomendaciones} from '../../services/recomendaciones';
import {MatDialog} from '@angular/material/dialog';
import {BlogResponse} from '../../../../core/models/blog.model';
import {DatePipe, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {Header} from '../../../../shared/components/header/header';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';
import {MatCard} from '@angular/material/card';
import {MatFormField} from '@angular/material/form-field';
import {MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {DeleteConfirmModal} from '../../components/delete-confirm-modal/delete-confirm-modal';
import {BlogRegisterModal} from '../../components/blog-register-modal/blog-register-modal';
import {BlogEditModal} from '../../components/blog-edit-modal/blog-edit-modal';

@Component({
  selector: 'app-blog-admin-list',
  imports: [
    SlicePipe,
    SlicePipe,
    DatePipe,
    Header,
    Breadcrumb,
    MatCard,
    MatFormField,
    MatLabel,
    MatSelect,
    FormsModule,
    MatOption,
    NgForOf,
    MatButton,
    MatIcon,
    NgIf,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef
  ],

  templateUrl: './blog-admin-list.html',
  styleUrl: './blog-admin-list.css',
})
export class BlogAdminList {
  private readonly recomendacionesService = inject(Recomendaciones);
  private readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['blogId', 'blogTipo', 'blogTitulo', 'blogEstado', 'blogFechaPublicacion', 'acciones'];
  dataSource: BlogResponse[] = [];
  blogIds: number[] = [];
  selectedBlogId: number | null = null;
  allBlogsCache: BlogResponse[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.isLoading = true;
    this.recomendacionesService.findAllBlogs().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.allBlogsCache = data; // Guardamos el cache completo
        this.blogIds = data.map(b => b.blogId);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar todos los blogs:', err);
        this.isLoading = false;
      }
    });
  }

  onIdSelectChange(id: number | null): void {
    this.selectedBlogId = id;
    if (id) {
      this.dataSource = this.allBlogsCache.filter(b => b.blogId === id);
    } else {
      this.dataSource = this.allBlogsCache;
    }
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(BlogRegisterModal, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadBlogs();
      }
    });
  }

  openEditModal(blogId: number): void {
    const dialogRef = this.dialog.open(BlogEditModal, {
      data: { id: blogId },
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadBlogs();
      }
    });
  }

  openDeleteModal(blogId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmModal, {
      data: { id: blogId },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadBlogs();
      }
    });
  }
}
