import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../shared/material/material.imports';
import {CommonModule} from '@angular/common';
import {Header} from '../../shared/components/header/header';
import {FeatureGrid} from './components/feature-grid/feature-grid';
import {HistoryList} from './components/history-list/history-list';
import {ReleaseNotes} from './components/release-notes/release-notes';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MATERIAL_IMPORTS, Header, FeatureGrid, HistoryList, ReleaseNotes],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomePage {

}
