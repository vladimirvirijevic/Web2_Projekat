import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAviocompanyFlightsComponent } from './admin-aviocompany-flights.component';

describe('AdminAviocompanyFlightsComponent', () => {
  let component: AdminAviocompanyFlightsComponent;
  let fixture: ComponentFixture<AdminAviocompanyFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAviocompanyFlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAviocompanyFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
