import {Component, inject} from '@angular/core';
import {TipDelDia} from '../../components/tip-del-dia/tip-del-dia';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {NoticiasList} from '../../components/noticias-list/noticias-list';
import {Header} from '../../../../shared/components/header/header';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-recomendaciones',
  imports: [
    MATERIAL_IMPORTS, TipDelDia, NoticiasList, Header, Breadcrumb, RouterLink, NgIf
  ],
  templateUrl: './recomendaciones.page.html',
  styleUrl: './recomendaciones.page.css',
})
export class RecomendacionesPage {
  satisfaccion: 'Poco' | 'Regular' | 'Mucho' | null = null;
  private router: Router = inject(Router);

  constructor() { }

  seleccionarSatisfaccion(valor: 'Poco' | 'Regular' | 'Mucho'): void {
    this.satisfaccion = valor;
  }

  goToAdminList(): void {
    this.router.navigate(['/home/recomendaciones/blog-admin-list']);
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
}
