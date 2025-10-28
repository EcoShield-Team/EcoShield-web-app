import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetSuccessPage } from './reset-success.page';

describe('ResetSuccessPage', () => {
  let component: ResetSuccessPage;
  let fixture: ComponentFixture<ResetSuccessPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetSuccessPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
