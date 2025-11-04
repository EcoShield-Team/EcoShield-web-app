import { Component } from '@angular/core';
import {DropzoneUpload} from '../../components/dropzone-upload/dropzone-upload';
import {Header} from '../../../../shared/components/header/header';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-detector-page',
  templateUrl: './detector.page.html',
  styleUrls: ['./detector.page.css'],
  imports: [DropzoneUpload, Header, Breadcrumb]
})
export class DetectorPage {}
