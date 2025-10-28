import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectorPage } from './detector.page';

describe('DetectorPage', () => {
  let component: DetectorPage;
  let fixture: ComponentFixture<DetectorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetectorPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
