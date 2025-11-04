import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // necesario para *ngIf, *ngFor
import { ActivatedRoute } from '@angular/router';
import { AlmanaqueService } from '../../services/almanaque';
import { PlagaDetail, PlagaList } from '../../../../core/models/plaga.model';
import { EnfermedadDetail, EnfermedadList } from '../../../../core/models/enfermedad.model';
import {Header} from '../../../../shared/components/header/header';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';

type TipoAlmanaque = 'plaga' | 'enfermedad';

@Component({
  selector: 'app-detalle-almanaque',
  standalone: true,
  imports: [CommonModule, Header, Breadcrumb],
  templateUrl: './detalleAlmanaque.page.html',
  styleUrls: ['./detalleAlmanaque.page.css'],
})
export class DetalleAlmanaquePage implements OnInit {

  tipo!: TipoAlmanaque;
  id!: number;
  plaga?: PlagaDetail;
  enfermedad?: EnfermedadDetail;
  relacionadasPlagas: PlagaList[] = [];
  relacionadasEnfermedades: EnfermedadList[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  activeTab: 'sintomas' | 'tratamiento' | 'causas' | 'prevencion' = 'sintomas';

  constructor(
    private route: ActivatedRoute,
    private almanaqueService: AlmanaqueService
  ) {}

  ngOnInit() {
    this.tipo = this.route.snapshot.paramMap.get('tipo') as TipoAlmanaque;
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.tipo === 'plaga') {
      this.cargarPlaga();
    } else {
      this.cargarEnfermedad();
    }
  }

  setTab(tab: 'sintomas' | 'tratamiento' | 'causas' | 'prevencion') {
    this.activeTab = tab;
  }

  get detalle() {
    return this.tipo === 'plaga' ? this.plaga : this.enfermedad;
  }

  get nombre() {
    return this.tipo === 'plaga' ? this.plaga?.plagaNombre : this.enfermedad?.enfermedadNombre;
  }

  get nombreCientifico() {
    return this.tipo === 'plaga' ? this.plaga?.plagaNombreCientifico : this.enfermedad?.enfermedadNombreCientifico;
  }

  get foto() {
    return this.tipo === 'plaga' ? this.plaga?.plagaFoto : this.enfermedad?.enfermedadFoto;
  }

  get relacionadas(): any[] {
    return this.tipo === 'plaga' ? this.relacionadasPlagas : this.relacionadasEnfermedades;
  }

  get descripcion() {
    if (!this.detalle) return {};
    return {
      sintomas: this.tipo === 'plaga' ? this.plaga?.plagaSintomas : this.enfermedad?.enfermedadSintomas,
      tratamiento: this.tipo === 'plaga' ? this.plaga?.plagaTratamiento : this.enfermedad?.enfermedadTratamiento,
      causas: this.tipo === 'plaga' ? this.plaga?.plagaCausas : this.enfermedad?.enfermedadCausas,
      prevencion: this.tipo === 'plaga' ? this.plaga?.plagaPrevenciones : this.enfermedad?.enfermedadPrevenciones
    };
  }

  getNombreRelacionado(r: any): string {
    return this.tipo === 'plaga' ? r.plagaNombre : r.enfermedadNombre;
  }

  getFotoRelacionado(r: any): string {
    return this.tipo === 'plaga' ? r.plagaFoto : r.enfermedadFoto;
  }

  private cargarPlaga() {
    this.almanaqueService.getPlagaById(this.id).subscribe({
      next: data => {
        this.plaga = data;
        this.loading = false;
        this.cargarRelacionadosPlaga();
      },
      error: err => {}
    });
  }

  private cargarEnfermedad() {
    this.almanaqueService.getEnfermedadById(this.id).subscribe({
      next: data => {
        this.enfermedad = data;
        this.loading = false;
        this.cargarRelacionadosEnfermedad();
      },
      error: err => {}
    });
  }

  private cargarRelacionadosPlaga() {
    this.almanaqueService.getPlagasRelacionadas(this.id).subscribe({
      next: data => this.relacionadasPlagas = data,
      error: err => console.error('Error al cargar plagas relacionadas', err)
    });
  }

  private cargarRelacionadosEnfermedad() {
    this.almanaqueService.getEnfermedadesRelacionadas(this.id).subscribe({
      next: data => this.relacionadasEnfermedades = data,
      error: err => console.error('Error al cargar enfermedades relacionadas', err)
    });
  }


}
