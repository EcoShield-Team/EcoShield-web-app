import { TestBed } from '@angular/core/testing';

import { Almanaque } from './almanaque';

describe('Almanaque', () => {
  let service: Almanaque;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Almanaque);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
