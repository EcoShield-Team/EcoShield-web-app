import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../../../shared/components/header/header';
import { AlmanaqueCard } from '../../components/almanaque-card/almanaque-card';
import { FilterSidebar } from '../../components/filter-sidebar/filter-sidebar';

export interface ItemAlmanaque {
  tipo: 'Enfermedad' | 'Plaga';
  subtipo: string;
  nombre: string;
  rutaDeImagen: string;
  reciente: boolean;
  route: string;
}

@Component({
  selector: 'app-almanaque',
  imports: [
    Header,
    AlmanaqueCard,
    FilterSidebar,
    CommonModule
  ],
  templateUrl: './almanaque.page.html',
  styleUrl: './almanaque.page.css',
})

export class AlmanaquePage implements OnInit {
  private items: ItemAlmanaque[] = [
    { tipo: 'Enfermedad', subtipo: 'Hongo', nombre: 'Oídio', rutaDeImagen: 'assets/images/almanaque/oidio.jpg', reciente: true, route: 'oidio' },
    { tipo: 'Enfermedad', subtipo: 'Hongo', nombre: 'Podredumbre Gris', rutaDeImagen: 'assets/images/almanaque/pobredumbre-gris.jpeg', reciente: false, route: 'podredumbre-gris' },
    { tipo: 'Enfermedad', subtipo: 'Bacteria', nombre: 'Xanthomonas fragariae', rutaDeImagen: 'assets/images/almanaque/xanthomonas.jpeg', reciente: false, route: 'xanthomonas' },
    { tipo: 'Enfermedad', subtipo: 'Hongo', nombre: 'Aracnosis', rutaDeImagen: 'assets/images/almanaque/aracnosis.jpeg', reciente: true, route: 'antracnosis' },
    { tipo: 'Plaga', subtipo: 'Insecto', nombre: 'Araña roja', rutaDeImagen: 'assets/images/almanaque/arana-roja.jpeg', reciente: true, route: 'arana-roja' },
    { tipo: 'Plaga', subtipo: 'Insecto', nombre: 'Trips', rutaDeImagen: 'assets/images/almanaque/trips.jpeg', reciente: false, route: 'trips' },
  ];


  enfermedades = signal<ItemAlmanaque[]>([]);
  plagas = signal<ItemAlmanaque[]>([]);


  ngOnInit() {
    this.enfermedades.set(this.items.filter(item => item.tipo === 'Enfermedad'));
    this.plagas.set(this.items.filter(item => item.tipo === 'Plaga'));
  }
}
