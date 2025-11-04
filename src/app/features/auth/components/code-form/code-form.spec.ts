import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeForm } from './code-form';

describe('CodeForm', () => {
  let component: CodeForm;
  let fixture: ComponentFixture<CodeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
