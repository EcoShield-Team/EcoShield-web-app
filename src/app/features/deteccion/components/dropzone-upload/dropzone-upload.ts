import { Component } from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dropzone-upload',
  templateUrl: './dropzone-upload.html',
  styleUrls: ['./dropzone-upload.css'],
  imports: [
    MATERIAL_IMPORTS,
    RouterLink
  ]
})
export class DropzoneUpload{}
