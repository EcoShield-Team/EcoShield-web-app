import {Component, Input} from '@angular/core';
import {BlogResponse} from '../../../../core/models/blog.model';
import {MatCard} from '@angular/material/card';
import {DatePipe, SlicePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-blog-list-card',
  imports: [
    MatCard,
    SlicePipe,
    DatePipe,
    MatIcon,
    MatButton,
    RouterLink
  ],
  templateUrl: './blog-list-card.html',
  styleUrl: './blog-list-card.css',
})
export class BlogListCard {
  @Input() blogData!: BlogResponse;

  constructor() { }
}
