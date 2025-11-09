import { Component } from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-features',
  imports: [MATERIAL_IMPORTS, NgOptimizedImage],
  templateUrl: './features.html',
  styleUrl: './features.css',
})
export class Features {

}
