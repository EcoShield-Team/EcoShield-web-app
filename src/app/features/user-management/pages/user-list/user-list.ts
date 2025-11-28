import {Component, inject, OnInit} from '@angular/core';
import {UserManagement} from '../../services/user-management';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {UsuarioResponse} from '../../../../core/models/usuario.model';
import {RolNombre} from '../../../../core/models/enums.model';
import {finalize} from 'rxjs';
import {EChartsOption} from 'echarts';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxEchartsModule} from 'ngx-echarts';
import {Router} from '@angular/router';
import {Header} from '../../../../shared/components/header/header';
import {DeleteConfirmModal} from '../../components/delete-confirm-modal/delete-confirm-modal';
import {UserEditModal} from '../../components/user-edit-modal/user-edit-modal';

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatMenuModule,
    MatSelectModule, MatProgressSpinnerModule, NgxEchartsModule, Header
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  standalone: true,
})
export class UserList implements OnInit {

  private readonly userManegement = inject(UserManagement);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<UsuarioResponse>([]);
  displayedColumns: string[] = [
    'usuarioId', 'usuarioNombre', 'usuarioCorreo', 'rolNombre',
    'usuarioEstado', 'online', 'usuarioFechaRegistro', 'actions'
  ];
  isLoading = false;

  selectedUserId: number | null = null;
  allUsersCache: UsuarioResponse[] = [];

  adminCount = 0;
  roles = Object.values(RolNombre);
  chartOptions: EChartsOption = {};

  ngOnInit(): void {
    this.loadUsers();
  }

  get userIds(): number[] {
    return this.allUsersCache.map(u => u.usuarioId);
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userManegement.findAll()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (users) => {
          this.dataSource.data = users;
          this.allUsersCache = users;

          this.adminCount = users.filter(u => u.rolNombre === RolNombre.ADMIN).length;
          this.prepareChartData(users);
        },
        error: (err) => {
          console.error('Error al cargar usuarios:', err);
        }
      });
  }

  onIdSelectChange(id: number | null): void {
    if (id) {
      const filteredUsers = this.allUsersCache.filter(u => u.usuarioId === id);
      this.dataSource.data = filteredUsers;
    } else {
      this.dataSource.data = this.allUsersCache;
    }
    this.dataSource._updateChangeSubscription();
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
          color: ['#387c44', '#6aaa74', '#93c47d', '#b6d7a8']
        }
      ]
    };
  }

  onDeleteUser(user: UsuarioResponse): void {
    const dialogRef = this.dialog.open(DeleteConfirmModal, {
      width: '400px', // Tamaño fijo para el modal
      data: {
        usuarioId: user.usuarioId,
        usuarioNombre: user.usuarioNombre
      },
    });

    // Suscribirse al cierre: si devuelve 'true', recargar la lista
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadUsers();
      }
    });
  }

  onChangeRole(user: UsuarioResponse & { newRolNombre?: RolNombre }, newRole: RolNombre): void {
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
            this.prepareChartData(this.dataSource.data);
          }
        },
        error: (err) => {
          console.error('Error al cambiar rol:', err);
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
