import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAviocompanySeatsComponent } from './admin-aviocompany-seats.component';

describe('AdminAviocompanySeatsComponent', () => {
  let component: AdminAviocompanySeatsComponent;
  let fixture: ComponentFixture<AdminAviocompanySeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAviocompanySeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAviocompanySeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
