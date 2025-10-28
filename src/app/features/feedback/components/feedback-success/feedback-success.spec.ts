import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackSuccess } from './feedback-success';

describe('FeedbackSuccess', () => {
  let component: FeedbackSuccess;
  let fixture: ComponentFixture<FeedbackSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
