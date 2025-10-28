import { Component } from '@angular/core';
import {TipDelDia} from '../../components/tip-del-dia/tip-del-dia';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {NoticiasList} from '../../components/noticias-list/noticias-list';
import {Header} from '../../../../shared/components/header/header';

@Component({
  selector: 'app-recomendaciones',
  imports: [
    MATERIAL_IMPORTS, TipDelDia, NoticiasList, Header
  ],
  templateUrl: './recomendaciones.page.html',
  styleUrl: './recomendaciones.page.css',
})
export class RecomendacionesPage {

}
