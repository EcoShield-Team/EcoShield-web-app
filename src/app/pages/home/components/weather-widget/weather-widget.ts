import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../../../core/services/weather.service';
import { WeatherResponse } from '../../../../core/models/weather.model';

@Component({
  selector: 'app-weather-widget',
  imports: [CommonModule],
  templateUrl: './weather-widget.html',
  styleUrl: './weather-widget.css',
})
export class WeatherWidget implements OnInit {
  weather = signal<WeatherResponse | null>(null);
  isLoading = signal(true);

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    const cached = this.weatherService.getCachedWeather();
    if (cached) {
      this.weather.set(cached);
      this.isLoading.set(false);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => this.loadWeather(pos.coords.latitude, pos.coords.longitude),
        () => this.loadFallback()
      );
    } else {
      this.loadFallback();
    }
  }

  private loadWeather(lat: number, lon: number) {
    this.weatherService.getWeather(lat, lon).subscribe({
      next: (data) => {
        this.weather.set(data);
        this.isLoading.set(false);
      },
      error: () => this.loadFallback(),
    });
  }

  private loadFallback() {
    this.weatherService.getWeather(undefined, undefined, 'Lima').subscribe({
      next: (data) => {
        this.weather.set(data);
        this.isLoading.set(false);
      },
    });
  }
}
