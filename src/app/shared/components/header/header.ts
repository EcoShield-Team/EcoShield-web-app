// src/app/shared/components/header/header.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../material/material.imports';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Auth } from '../../../features/auth/services/auth';
import { UsuarioAuth } from '../../../core/models/auth.model';
import { UsuarioService } from '../../../core/services/usuario';
import { UsuarioResponse } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MATERIAL_IMPORTS, NgOptimizedImage, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  usuarioAuth: UsuarioAuth | null = null;
  usuarioCompleto: UsuarioResponse | null = null;

  fotoPerfil: string = '/assets/images/usuario/user_placeholder.jpg';
  nombreUsuario: string = 'Mi cuenta';

  constructor(
    private auth: Auth,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioAuth = this.auth.getCurrentUser();

    if (!this.usuarioAuth) {
      console.warn('Header: no hay usuario autenticado.');
      return;
    }

    this.nombreUsuario = this.usuarioAuth.usuarioNombre || 'Mi cuenta';

    const id = this.usuarioAuth.usuarioId;

    this.usuarioService.getById(id).subscribe({
      next: (user) => {
        this.usuarioCompleto = user;
        this.nombreUsuario = user.usuarioNombre || this.nombreUsuario;

        if (user.usuarioFotoPerfil?.trim()) {
          this.fotoPerfil = user.usuarioFotoPerfil;
        }
      },
      error: (err) => {
        console.warn('No se pudo obtener el perfil del usuario.', err);
      },
    });
  }

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/auth']);
  }
}
