import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTendencias } from './sidebar-tendencias';

describe('SidebarTendencias', () => {
  let component: SidebarTendencias;
  let fixture: ComponentFixture<SidebarTendencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarTendencias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarTendencias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
