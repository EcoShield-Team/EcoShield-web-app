import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // necesario para *ngIf, *ngFor
import {ActivatedRoute, Router} from '@angular/router';
import { AlmanaqueService } from '../../services/almanaque';
import { PlagaDetail, PlagaList } from '../../../../core/models/plaga.model';
import { EnfermedadDetail, EnfermedadList } from '../../../../core/models/enfermedad.model';
import {Header} from '../../../../shared/components/header/header';
import {Breadcrumb} from '../../../../shared/components/breadcrumb/breadcrumb';
import { Meta, Title } from '@angular/platform-browser';

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
    private almanaqueService: AlmanaqueService,
    private router: Router,
    private meta: Meta,
    private titleService: Title
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.tipo = params.get('tipo') as TipoAlmanaque;
      this.id = Number(params.get('id'));

      if (this.tipo === 'plaga') {
        this.cargarPlaga();
      } else {
        this.cargarEnfermedad();
      }
    });
  }

  verDetalle(tipo: TipoAlmanaque, id: number) {
    this.router.navigate(['/almanaque', tipo, id]);
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

        this.actualizarMetaTags(
          data.plagaNombre,
          data.plagaDescripcion,
          data.plagaFoto
        );
      },
      error: err => {
      }
    });
  }

  private cargarEnfermedad() {
    this.almanaqueService.getEnfermedadById(this.id).subscribe({
      next: data => {
        this.enfermedad = data;
        this.loading = false;
        this.cargarRelacionadosEnfermedad();

        this.actualizarMetaTags(
          data.enfermedadNombre,
          data.enfermedadDescripcion,
          data.enfermedadFoto
        );
      },
      error: err => {
      }
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

  share(platform: string) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      this.tipo === 'plaga'
        ? this.plaga?.plagaNombre ?? ''
        : this.enfermedad?.enfermedadNombre ?? ''
    );

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`;
        break;
    }

    window.open(shareUrl, '_blank');
  }

  private actualizarMetaTags(title: string, description: string, imageUrl: string) {
    this.titleService.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: window.location.href });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
  }

}
