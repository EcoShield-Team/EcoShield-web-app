import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header} from '../../shared/components/header/header';
import {FeatureGrid} from './components/feature-grid/feature-grid';
import {HistoryList} from './components/history-list/history-list';
import {ReleaseNotes} from './components/release-notes/release-notes';
import {WeatherWidget} from './components/weather-widget/weather-widget';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Header, FeatureGrid, HistoryList, ReleaseNotes, WeatherWidget],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

}
