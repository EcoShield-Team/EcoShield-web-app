import { Component } from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-noticias-list',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS
  ],
  templateUrl: './noticias-list.html',
  styleUrl: './noticias-list.css',
})
export class NoticiasList {

}
