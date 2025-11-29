import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserManagement } from '../../services/user-management';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';

export interface DeleteUserDialogData {
  usuarioId: number;
  usuarioNombre: string;
}

@Component({
  selector: 'app-delete-confirm-modal',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS
  ],
  templateUrl: './delete-confirm-modal.html',
  styleUrl: './delete-confirm-modal.css',
})
export class DeleteConfirmModal {
  private readonly userManagement = inject(UserManagement);
  private readonly snackBar = inject(MatSnackBar);

  public isDeleting = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmModal>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteUserDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.isDeleting = true;

    this.userManagement.eliminarUsuario(this.data.usuarioId).subscribe({
      next: () => {
        this.snackBar.open(`Usuario "${this.data.usuarioNombre}" eliminado con éxito.`, 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al eliminar usuario. Verifique permisos.', 'Cerrar', { duration: 4000 });
        this.isDeleting = false;
        this.dialogRef.close(false);
      }
    });
  }
}
