import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeartbeatService} from './core/services/heartbeat.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Ecoshield-web-app');
  private heartbeat = inject(HeartbeatService);
}
