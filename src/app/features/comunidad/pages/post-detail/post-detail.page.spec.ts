import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailPage } from './post-detail.page';

describe('PostDetailPage', () => {
  let component: PostDetailPage;
  let fixture: ComponentFixture<PostDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
