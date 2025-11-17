import {Component, Inject, inject} from '@angular/core';
import {Recomendaciones} from '../../services/recomendaciones';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

export interface DeleteDialogData {
  id: number;
}

@Component({
  selector: 'app-delete-confirm-modal',
  imports: [
    MatDialogTitle,
    MatIcon,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    NgIf,
    MatProgressSpinner
  ],
  templateUrl: './delete-confirm-modal.html',
  styleUrl: './delete-confirm-modal.css',
})
export class DeleteConfirmModal {
  private readonly blogService = inject(Recomendaciones);
  private readonly snackBar = inject(MatSnackBar);
  public isDeleting = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmModal>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData,
  ) {}

  onNoClick(): void {
    // Cerrar el modal sin devolver nada
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.isDeleting = true;

    // Llama al controller DELETE /blogs/{id}
    this.blogService.borrarAdmin(this.data.id).subscribe({
      next: () => {
        this.snackBar.open(`Blog #${this.data.id} eliminado.`, 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open('Error al eliminar. Intente de nuevo.', 'Cerrar', { duration: 3000 });
        this.isDeleting = false;
        this.dialogRef.close(false);
      }
    });
  }
}
