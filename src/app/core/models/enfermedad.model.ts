import { EnfermedadTipo, Temporada, Severidad } from './enums.model';

export interface EnfermedadList {
  enfermedadId: number;
  enfermedadNombre: string;
  enfermedadTipo: EnfermedadTipo;
  enfermedadFoto: string;
  temporada: Temporada;
  severidad: Severidad;
}

export interface EnfermedadDetail extends EnfermedadList {
  enfermedadNombreCientifico: string;
  enfermedadDescripcion: string;
  enfermedadSintomas: string;
  enfermedadTratamiento: string;
  enfermedadCausas: string;
  enfermedadPrevenciones: string;
}
