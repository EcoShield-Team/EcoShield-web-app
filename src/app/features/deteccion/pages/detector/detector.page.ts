import { Component } from '@angular/core';
import {DropzoneUpload} from '../../components/dropzone-upload/dropzone-upload';
import {Header} from '../../../../shared/components/header/header';

@Component({
  selector: 'app-detector-page',
  templateUrl: './detector.page.html',
  styleUrls: ['./detector.page.css'],
  imports: [
    DropzoneUpload,
    Header
  ]
})
export class DetectorPage {}
