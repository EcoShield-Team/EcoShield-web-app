import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureBar } from './feature-bar';

describe('FeatureBar', () => {
  let component: FeatureBar;
  let fixture: ComponentFixture<FeatureBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
