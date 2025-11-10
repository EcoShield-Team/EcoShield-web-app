export interface WeatherResponse {
  location: string;
  description: string;
  tempMin: number;
  tempMax: number;
  rainProb: string;
  weatherIcon: string;
  precipIcon: string;
}
