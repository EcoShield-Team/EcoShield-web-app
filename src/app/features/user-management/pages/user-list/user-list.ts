import { Component, inject, OnInit } from '@angular/core';
import { UserManagement } from '../../services/user-management';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioResponse } from '../../../../core/models/usuario.model';
import { RolNombre } from '../../../../core/models/enums.model';
import { finalize } from 'rxjs';
import { EChartsOption } from 'echarts';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { Router } from '@angular/router';
import { Header } from '../../../../shared/components/header/header';
import { DeleteConfirmModal } from '../../components/delete-confirm-modal/delete-confirm-modal';
import { UserEditModal } from '../../components/user-edit-modal/user-edit-modal';
import { DatePipe } from '@angular/common';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {Auth} from '../../../auth/services/auth';

@Component({
  selector: 'app-user-list',
  imports: [
    FormsModule,
    MATERIAL_IMPORTS,
    NgxEchartsModule,
    Header,
    DatePipe
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  standalone: true,
})
export class UserList implements OnInit {

  private readonly userManegement = inject(UserManagement);
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<UsuarioResponse>([]);
  displayedColumns: string[] = [
    'usuarioId', 'usuarioNombre', 'usuarioCorreo', 'rolNombre',
    'usuarioEstado', 'online', 'usuarioFechaRegistro', 'actions'
  ];
  isLoading = false;


  searchTerm: string = '';
  filterStatus: string = 'TODOS';

  allUsersCache: UsuarioResponse[] = [];

  adminCount = 0;
  roles = Object.values(RolNombre);
  chartOptions: EChartsOption = {};
  currentUserId: number | null = null;

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userManegement.findAll()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (users) => {
          const sortedUsers = users.sort((a, b) => a.usuarioId - b.usuarioId);
          this.allUsersCache = sortedUsers;
          this.adminCount = users.filter(u => u.rolNombre === RolNombre.ADMIN).length;
          this.applyFilters();
          this.prepareChartData(users);
        },
        error: (err) => {
          console.error('Error al cargar usuarios:', err);
        }
      });
  }

  applyFilters(): void {
    let filtered = [...this.allUsersCache];

    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(u =>
        u.usuarioId.toString().includes(term) ||
        u.usuarioNombre.toLowerCase().includes(term) ||
        u.usuarioCorreo.toLowerCase().includes(term)
      );
    }

    if (this.filterStatus !== 'TODOS') {
      filtered = filtered.filter(u => u.usuarioEstado === this.filterStatus);
    }

    this.dataSource.data = filtered;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  prepareChartData(users: UsuarioResponse[]): void {
    const roleCounts = users.reduce((acc, user) => {
      acc[user.rolNombre] = (acc[user.rolNombre] || 0) + 1;
      return acc;
    }, {} as Record<RolNombre, number>);

    const chartData = Object.entries(roleCounts).map(([name, value]) => ({
      name,
      value
    }));

    this.initChart(chartData);
  }

  initChart(data: { name: string, value: number }[]): void {
    this.chartOptions = {
      title: {
        text: 'Distribución de Roles de Usuarios',
        left: 'center',
        textStyle: { color: '#387c44' }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: data.map(d => d.name)
      },
      series: [
        {
          name: 'Roles',
          type: 'pie',
          radius: '70%',
          center: ['50%', '60%'],
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          color: ['#2c6536', '#81d18d', '#93c47d', '#b6d7a8']
        }
      ]
    };
  }

  onDeleteUser(user: UsuarioResponse): void {
    if (user.usuarioId === this.currentUserId) {
      alert("No puedes eliminar tu propia cuenta.");
      return;
    }
    const dialogRef = this.dialog.open(DeleteConfirmModal, {
      width: '500px',
      data: {
        usuarioId: user.usuarioId,
        usuarioNombre: user.usuarioNombre
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadUsers();
      }
    });
  }

  onChangeRole(user: UsuarioResponse & { newRolNombre?: RolNombre }, newRole: RolNombre): void {
    if (user.usuarioId === this.currentUserId && user.rolNombre === RolNombre.ADMIN && newRole !== RolNombre.ADMIN) {
      if(!confirm("Estás a punto de quitarte tus propios permisos de Administrador. ¿Estás seguro?")) {
        this.loadUsers();
        return;
      }
    }
    if (user.rolNombre === newRole) return;

    this.userManegement.asignarRol(user.usuarioId, newRole)
      .subscribe({
        next: (updatedUser) => {
          const index = this.dataSource.data.findIndex(u => u.usuarioId === updatedUser.usuarioId);

          if (index !== -1) {
            this.dataSource.data[index] = updatedUser;

            const cacheIndex = this.allUsersCache.findIndex(u => u.usuarioId === updatedUser.usuarioId);
            if (cacheIndex !== -1) {
              this.allUsersCache[cacheIndex] = updatedUser;
            }

            delete user.newRolNombre;
            this.dataSource._updateChangeSubscription();
            this.prepareChartData(this.allUsersCache);
            if (updatedUser.usuarioId === this.currentUserId && updatedUser.rolNombre !== RolNombre.ADMIN) {
              alert("Has cambiado tu rol correctamente. Como ya no eres Administrador, serás redirigido al inicio.");
              this.router.navigate(['/comunidad']);
            }
          }
        },
        error: (err) => {
          console.error('Error al cambiar rol:', err);
          this.loadUsers();
        }
      });
  }

  onEditUser(id: number): void {
    const dialogRef = this.dialog.open(UserEditModal, {
      width: '600px',
      data: { usuarioId: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadUsers();
      }
    });
  }
}
