import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {Header} from '../../shared/components/header/header';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  emailUrl: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    Header,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  teamMembers = signal<TeamMember[]>([
    {
      name: 'Gerardo Chavez',
      role: 'Líder de Proyecto & Agrónomo',
      bio: 'Especialista en sanidad vegetal y detección temprana de plagas. Mantiene nuestros estándares de precisión.',
      imageUrl: '/assets/images/about/gerardo.png',
      emailUrl: 'u202314672@upc.edu.pe',
    },
    {
      name: 'Erik Ochoa',
      role: 'Desarrollador Frontend',
      bio: 'Encargado de la interfaz de usuario y la experiencia EcoShield, asegurando una interacción fluida.',
      imageUrl: '/assets/images/about/erik.png',
      emailUrl: 'u202310808@upc.edu.pe',
    },
    {
      name: 'Camilo Parraga',
      role: 'Especialista de IA y Backend',
      bio: 'Desarrollo de los modelos de detección de enfermedades y optimización del procesamiento de datos.',
      imageUrl: '/assets/images/about/camilo.png',
      emailUrl: 'u202323939@upc.edu.pe',
    },
    {
      name: 'Diego Ricra',
      role: 'Experto en Clima y Datos',
      bio: 'Responsable de integrar datos meteorológicos en las recomendaciones de riego y tratamiento.',
      imageUrl: '/assets/images/about/diego.png',
      emailUrl: 'u202310729@upc.edu.pe',
    },
    {
      name: 'Irvin Vergara',
      role: 'Diseñador UX/UI',
      bio: 'Asegurando que la aplicación sea intuitiva y fácil de usar, incluso con guantes en el campo.',
      imageUrl: '/assets/images/about/irvin.png',
      emailUrl: 'u20231c837@upc.edu.pe',
    },
  ]);
}
