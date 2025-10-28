import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseNotes } from './release-notes';

describe('ReleaseNotes', () => {
  let component: ReleaseNotes;
  let fixture: ComponentFixture<ReleaseNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleaseNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleaseNotes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
