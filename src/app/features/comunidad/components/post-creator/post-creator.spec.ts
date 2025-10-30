import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreator } from './post-creator';

describe('PostCreator', () => {
  let component: PostCreator;
  let fixture: ComponentFixture<PostCreator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCreator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCreator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
