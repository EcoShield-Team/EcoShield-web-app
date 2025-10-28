import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoCard } from './resultado-card';

describe('ResultadoCard', () => {
  let component: ResultadoCard;
  let fixture: ComponentFixture<ResultadoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
