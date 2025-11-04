import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBar } from './ticket-bar';

describe('TicketBar', () => {
  let component: TicketBar;
  let fixture: ComponentFixture<TicketBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
