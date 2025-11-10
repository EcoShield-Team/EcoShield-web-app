import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WeatherResponse } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiUrl = `${environment.apiURl}/weather`;
  private http = inject(HttpClient);

  private cachedWeather = signal<WeatherResponse | null>(null);

  private getHeaders(): HttpHeaders | undefined {
    if (!environment.token) return undefined;
    return new HttpHeaders({ Authorization: `Bearer ${environment.token}` });
  }

  getWeather(lat?: number, lon?: number, city: string = 'Lima'): Observable<WeatherResponse> {
    if (this.cachedWeather()) {
      return new Observable((observer) => {
        observer.next(this.cachedWeather()!);
        observer.complete();
      });
    }

    const options = this.getHeaders() ? { headers: this.getHeaders() } : {};
    let request$: Observable<WeatherResponse>;

    if (lat != null && lon != null)
      request$ = this.http.get<WeatherResponse>(`${this.apiUrl}?lat=${lat}&lon=${lon}`, options);
    else
      request$ = this.http.get<WeatherResponse>(`${this.apiUrl}?city=${city}`, options);

    return request$.pipe(tap((data) => this.cachedWeather.set(data)));
  }

  getCachedWeather(): WeatherResponse | null {
    return this.cachedWeather();
  }

  clearCache(): void {
    this.cachedWeather.set(null);
  }
}
