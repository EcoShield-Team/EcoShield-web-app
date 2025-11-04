import {Component, Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-almanaque-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink],
  templateUrl: './almanaque-card.html',
  styleUrls: ['./almanaque-card.css'],
})
export class AlmanaqueCard {
  @Input() id!: number;
  @Input() nombre!: string;
  @Input() tipo!: 'plaga' | 'enfermedad';
  @Input() subtipo!: string;
  @Input() imagen!: string;
}
