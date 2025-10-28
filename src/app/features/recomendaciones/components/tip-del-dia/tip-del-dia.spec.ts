import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipDelDia } from './tip-del-dia';

describe('TipDelDia', () => {
  let component: TipDelDia;
  let fixture: ComponentFixture<TipDelDia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipDelDia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipDelDia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
