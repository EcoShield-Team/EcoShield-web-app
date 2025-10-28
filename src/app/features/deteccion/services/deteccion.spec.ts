import { TestBed } from '@angular/core/testing';

import { Deteccion } from './deteccion';

describe('Deteccion', () => {
  let service: Deteccion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Deteccion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
