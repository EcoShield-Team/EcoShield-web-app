import {Component, Input} from '@angular/core';
import {PostResponse} from '../../../../core/models/post.model';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-post-card',
  imports: [MATERIAL_IMPORTS, DatePipe],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css',
})
export class PostCard {
  @Input() post!: PostResponse;

  constructor(private router: Router) {}

  verDetalle() {
    this.router.navigate(['/home/comunidad/post', this.post.postId]);
  }
}
