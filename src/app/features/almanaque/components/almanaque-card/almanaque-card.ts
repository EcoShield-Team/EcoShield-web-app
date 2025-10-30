import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatCard} from '@angular/material/card';
import {ItemAlmanaque} from '../../pages/almanaque/almanaque.page';

@Component({
  selector: 'app-almanaque-card',
  imports: [
    RouterLink,
    MatCard
  ],
  templateUrl: './almanaque-card.html',
  styleUrl: './almanaque-card.css',
})
export class AlmanaqueCard {
  @Input({ required: true }) item!: ItemAlmanaque;
}
