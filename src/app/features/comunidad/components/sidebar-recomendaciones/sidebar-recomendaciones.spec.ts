import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRecomendaciones } from './sidebar-recomendaciones';

describe('SidebarRecomendaciones', () => {
  let component: SidebarRecomendaciones;
  let fixture: ComponentFixture<SidebarRecomendaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarRecomendaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarRecomendaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
