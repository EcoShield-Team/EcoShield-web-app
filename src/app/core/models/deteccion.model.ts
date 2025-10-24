export interface DeteccionResponse {
  deteccionId: number;
  fotoUrl: string;
  descripcion: string;
  confianza: number;
  tipo: string;
  nombreDetectado: string;
  coordenadas: Region;
  fecha: string;
}

export interface Region {
  x: number;
  y: number;
  ancho: number;
  alto: number;
}
