import {Component, OnInit, signal} from '@angular/core';
import { Router } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../material/material.imports';
import {NgIf, NgOptimizedImage} from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../features/auth/services/auth';
import { UsuarioAuth } from '../../../core/models/auth.model';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MATERIAL_IMPORTS, NgOptimizedImage, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  usuarioAuth = signal<UsuarioAuth | null>(null);
  fotoPerfil = signal<string>('/assets/images/usuario/user_placeholder.jpg');
  nombreUsuario = signal<string>('Mi cuenta');

  esAdmin = signal(false);

  constructor(
    private auth: Auth,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const authUser = this.auth.getCurrentUser();
    this.usuarioAuth.set(authUser);

    if (!authUser) return;

    this.nombreUsuario.set(authUser.usuarioNombre ?? 'Mi cuenta');

    this.usuarioService.getById(authUser.usuarioId).subscribe({
      next: (user) => {
        this.nombreUsuario.set(user.usuarioNombre);
        if (user.usuarioFotoPerfil?.trim()) {
          this.fotoPerfil.set(user.usuarioFotoPerfil);
        }
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }

  esAdministrador(): boolean {
    const rawUser = localStorage.getItem('ecoshield_user');
    if (!rawUser) return false;

    try {
      const user = JSON.parse(rawUser);

      return user?.usuarioRol === 'ROLE_ADMIN';

    } catch (e) {
      console.error('Error al leer el rol del administrador:', e);
      return false;
    }
  }

  goToAdminList(): void {
    this.router.navigate(['/admin/users/list']);
  }
}
