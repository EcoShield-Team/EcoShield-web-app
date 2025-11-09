import { Component } from '@angular/core';
import {Hero} from './components/hero/hero';
import {Navbar} from './components/navbar/navbar';
import {Testimonial} from './components/testimonial/testimonial';
import {TicketBar} from './components/ticket-bar/ticket-bar';
import {Features} from './components/features/features';
import {FeatureBar} from './components/feature-bar/feature-bar';
import {Cta} from './components/cta/cta';
import {Footer} from './components/footer/footer';
import {Team} from './components/team/team';
import {Faq} from './components/faq/faq';

@Component({
  selector: 'app-landing',
  imports: [
    Navbar,
    Hero,
    Testimonial,
    TicketBar,
    Features,
    FeatureBar,
    Cta,
    Footer,
    Team,
    Faq
  ],
  templateUrl: './landing.page.html',
  styleUrl: './landing.page.css',
})
export class LandingPage {

}
