import { TestBed } from '@angular/core/testing';

import { Recomendaciones } from './recomendaciones';

describe('Recomendaciones', () => {
  let service: Recomendaciones;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Recomendaciones);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
