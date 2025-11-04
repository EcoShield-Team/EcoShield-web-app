import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, NgOptimizedImage, MATERIAL_IMPORTS, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar{
}
