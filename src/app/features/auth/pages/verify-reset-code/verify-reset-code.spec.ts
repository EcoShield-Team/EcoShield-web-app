import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyResetCode } from './verify-reset-code';

describe('VerifyResetCode', () => {
  let component: VerifyResetCode;
  let fixture: ComponentFixture<VerifyResetCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyResetCode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyResetCode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
