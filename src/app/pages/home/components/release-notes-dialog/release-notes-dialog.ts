import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';

@Component({
  selector: 'app-release-notes-dialog',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './release-notes-dialog.html',
  styleUrl: './release-notes-dialog.css',
})
export class ReleaseNotesDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public notes: any[]) {}
}
