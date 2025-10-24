import { PlagaTipo, Temporada, Severidad } from './enums.model';

export interface PlagaList {
  plagaId: number;
  plagaNombre: string;
  plagaTipo: PlagaTipo;
  plagaFoto: string;
  temporada: Temporada;
  severidad: Severidad;
}

export interface PlagaDetail extends PlagaList {
  plagaNombreCientifico: string;
  plagaDescripcion: string;
  plagaSintomas: string;
  plagaTratamiento: string;
  plagaCausas: string;
  plagaPrevenciones: string;
}
