import { Component } from '@angular/core';
import {MATERIAL_IMPORTS} from '../../material/material.imports';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MATERIAL_IMPORTS, NgOptimizedImage, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
