import { Component } from '@angular/core';
import {MATERIAL_IMPORTS} from '../../material/material.imports';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MATERIAL_IMPORTS, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
