import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropzoneUpload } from './dropzone-upload';

describe('DropzoneUpload', () => {
  let component: DropzoneUpload;
  let fixture: ComponentFixture<DropzoneUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropzoneUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropzoneUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
