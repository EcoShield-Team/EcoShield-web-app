import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeedbackListPage } from './admin-feedback-list.page';

describe('AdminFeedbackListPage', () => {
  let component: AdminFeedbackListPage;
  let fixture: ComponentFixture<AdminFeedbackListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFeedbackListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFeedbackListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
