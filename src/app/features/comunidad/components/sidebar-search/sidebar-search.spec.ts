import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSearch } from './sidebar-search';

describe('SidebarSearch', () => {
  let component: SidebarSearch;
  let fixture: ComponentFixture<SidebarSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
