import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {catchError, Observable, of} from 'rxjs';
import {FeedbackResponse} from '../../../../core/models/feedback.model';
import {Feedback} from '../../services/feedback';
import { HttpErrorResponse } from '@angular/common/http';
import {FeedbackTipo} from '../../../../core/models/enums.model';
import {Header} from '../../../../shared/components/header/header';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-admin-feedback-list-page',
  standalone: true,
  imports: [CommonModule, Header, Breadcrumb],
  templateUrl: './admin-feedback-list.page.html',
  styleUrls: ['./admin-feedback-list.page.css']
})
export class AdminFeedbackListPage implements OnInit {

  feedbackList$!: Observable<FeedbackResponse[]>;
  accessDenied: boolean = false;
  currentSearchTerm: string | number | null = null;

  private feedbackService = inject(Feedback);

  feedbackTipos = Object.values(FeedbackTipo);

  ngOnInit(): void {
    this.loadAdminFeedbacks();
  }

  loadAdminFeedbacks(): void {
    this.accessDenied = false;
    this.currentSearchTerm = null;

    this.feedbackList$ = this.feedbackService.findAllForAdmin().pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.accessDenied = true;
        } else {
          console.error('Error al cargar todos los feedbacks:', error);
        }
        return of([]);
      })
    );
  }

  searchByUsuarioId(usuarioId: number): void {
    this.accessDenied = false;
    this.currentSearchTerm = usuarioId;

    this.feedbackList$ = this.feedbackService.findByUsuarioidAdmin(usuarioId).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.accessDenied = true;
        } else {
          console.error(`Error al buscar feedbacks del usuario ${usuarioId}:`, error);
        }
        return of([]);
      })
    );
  }

  filterByTipo(tipoString: string): void {

    if (!tipoString) {
      this.loadAdminFeedbacks();
      return;
    }

    const tipo = tipoString as FeedbackTipo;

    this.accessDenied = false;
    this.currentSearchTerm = tipo;

    this.feedbackList$ = this.feedbackService.findByTipoAdmin(tipo).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.accessDenied = true;
        } else {
          console.error(`Error al filtrar por tipo ${tipo}:`, error);
        }
        return of([]);
      })
    );
  }

  deleteFeedback(id: number): void {
    if (confirm(`¿Estás seguro de que quieres eliminar el feedback con ID ${id}?`)) {
      this.feedbackService.borrarForAdmin(id).subscribe({
        next: () => {
          console.log(`Feedback ${id} eliminado con éxito.`);
          if (this.currentSearchTerm) {
            this.loadAdminFeedbacks();
          } else {
            this.loadAdminFeedbacks();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error al intentar eliminar el feedback:', err);
          if (err.status === 403) {
            this.accessDenied = true;
          }
        }
      });
    }
  }
}
