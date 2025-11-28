import {Component, Inject, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {UserManagement} from '../../services/user-management';


export interface DeleteUserDialogData {
  usuarioId: number;
  usuarioNombre: string;
}

@Component({
  selector: 'app-delete-confirm-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './delete-confirm-modal.html',
  styleUrl: './delete-confirm-modal.css',
})
export class DeleteConfirmModal {
  private readonly userManagement = inject(UserManagement);
  private readonly snackBar = inject(MatSnackBar);
  public isDeleting = false;

  // Inyección de la referencia del diálogo y los datos (ID del usuario)
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmModal>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteUserDialogData,
  ) {}

  onNoClick(): void {
    // Cerrar el modal sin devolver resultado exitoso (false)
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.isDeleting = true;

    // Llama al controller DELETE /users/{id}
    this.userManagement.eliminarUsuario(this.data.usuarioId).subscribe({
      next: () => {
        this.snackBar.open(`Usuario "${this.data.usuarioNombre}" eliminado con éxito.`, 'Cerrar', { duration: 3000 });
        // Cierra el modal y devuelve 'true' para que la página de listado recargue
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open('Error al eliminar usuario. Verifique permisos.', 'Cerrar', { duration: 4000 });
        this.isDeleting = false;
        this.dialogRef.close(false);
      }
    });
  }
}
