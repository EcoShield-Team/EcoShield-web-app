import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackError } from './feedback-error';

describe('FeedbackError', () => {
  let component: FeedbackError;
  let fixture: ComponentFixture<FeedbackError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
