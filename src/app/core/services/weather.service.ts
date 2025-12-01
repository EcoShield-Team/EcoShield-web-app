import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { WeatherResponse } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiURl = `${environment.apiURl}/weather`;
  private readonly http = inject(HttpClient);

  private cachedWeather = signal<WeatherResponse | null>(null);

  getWeather(
    lat?: number,
    lon?: number,
    city: string = 'Lima'
  ): Observable<WeatherResponse> {
    const cached = this.cachedWeather();
    if (cached) {
      return of(cached);
    }

    let request$: Observable<WeatherResponse>;

    if (lat != null && lon != null) {
      request$ = this.http.get<WeatherResponse>(`${this.apiURl}`, {
        params: { lat, lon },
      });
    } else {
      request$ = this.http.get<WeatherResponse>(`${this.apiURl}`, {
        params: { city },
      });
    }

    return request$.pipe(tap((data) => this.cachedWeather.set(data)));
  }

  getCachedWeather(): WeatherResponse | null {
    return this.cachedWeather();
  }

  clearCache(): void {
    this.cachedWeather.set(null);
  }
}
