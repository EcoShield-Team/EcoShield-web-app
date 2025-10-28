import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoDeteccionPage } from './resultado-deteccion.page';

describe('ResultadoDeteccionPage', () => {
  let component: ResultadoDeteccionPage;
  let fixture: ComponentFixture<ResultadoDeteccionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoDeteccionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoDeteccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
