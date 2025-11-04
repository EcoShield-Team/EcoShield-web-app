import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EnfermedadDetail, EnfermedadList} from '../../../core/models/enfermedad.model';
import {PlagaDetail, PlagaList} from '../../../core/models/plaga.model';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class AlmanaqueService {
  private apiUrl = 'http://localhost:8080/almanaque';

  constructor(private http: HttpClient) {}

  //ENFERMEDADES

  getEnfermedades(): Observable<EnfermedadList[]> {
    return this.http.get<EnfermedadList[]>(`${this.apiUrl}/enfermedades`);
  }

  getEnfermedadById(id: number): Observable<EnfermedadDetail> {
    return this.http.get<EnfermedadDetail>(`${this.apiUrl}/enfermedades/${id}`);
  }

  getEnfermedadesRelacionadas(id: number): Observable<EnfermedadList[]> {
    return this.http.get<EnfermedadList[]>(`${this.apiUrl}/enfermedades/${id}/relacionadas`);
  }

  getEnfermedadesTipo(tipo: string): Observable<EnfermedadList[]> {
    return this.http.get<EnfermedadList[]>(`${this.apiUrl}/enfermedades/filtro/tipo`, {params: {tipo}});
  }

  getEnfermedadesTemporada(temporada: string): Observable<EnfermedadList[]> {
    return this.http.get<EnfermedadList[]>(`${this.apiUrl}/enfermedades/filtro/temporada`, {
      params: { temporada }
    });
  }

  getEnfermedadesSeveridad(severidad: string): Observable<EnfermedadList[]> {
    return this.http.get<EnfermedadList[]>(`${this.apiUrl}/enfermedades/filtro/severidad`, {
      params: { severidad }
    });
  }

  getEnfermedadesPorNombre(nombre: string): Observable<EnfermedadList[]> {
    return this.http.get<EnfermedadList[]>(`${this.apiUrl}/enfermedades/buscar`, {
      params: { nombre }
    });
  }

  getEnfermedadesOrdenadasASC():Observable<EnfermedadList[]> {
    return this.http.get<EnfermedadList[]>(`${this.apiUrl}/enfermedades/ordenadas/nombre-asc`);
  }

  getEnfermedadesOrdenadasDESC():Observable<EnfermedadList[]> {
    return this.http.get<EnfermedadList[]>(`${this.apiUrl}/enfermedades/ordenadas/nombre-desc`);
  }

  //PLAGAS

  getPlagas(): Observable<PlagaList[]> {
    return this.http.get<PlagaList[]>(`${this.apiUrl}/plagas`);
  }

  getPlagaById(id: number): Observable<PlagaDetail> {
    return this.http.get<PlagaDetail>(`${this.apiUrl}/plagas/${id}`);
  }

  getPlagasRelacionadas(id: number): Observable<PlagaList[]> {
    return this.http.get<PlagaList[]>(`${this.apiUrl}/plagas/${id}/relacionadas`);
  }

  getPlagasTipo(tipo: string): Observable<PlagaList[]> {
    return this.http.get<PlagaList[]>(`${this.apiUrl}/plagas/filtro/tipo`, {params: {tipo}});
  }

  getPlagasTemporada(temporada: string): Observable<PlagaList[]> {
    return this.http.get<PlagaList[]>(`${this.apiUrl}/plagas/filtro/temporada`, {params: {temporada}});
  }

  getPlagasSeveridad(severidad: string): Observable<PlagaList[]> {
    return this.http.get<PlagaList[]>(`${this.apiUrl}/plagas/filtro/severidad`, {params: {severidad}});
  }

  getPlagasPorNombre(nombre: string): Observable<PlagaList[]> {
    return this.http.get<PlagaList[]>(`${this.apiUrl}/plagas/buscar`, {
      params: { nombre }
    });
  }

  getPlagasOrdenadasASC():Observable<PlagaList[]> {
    return this.http.get<PlagaList[]>(`${this.apiUrl}/plagas/ordenadas/nombre-asc`);
  }

  getPlagasOrdenadasDESC():Observable<PlagaList[]> {
    return this.http.get<PlagaList[]>(`${this.apiUrl}/plagas/ordenadas/nombre-desc`);
  }
}
