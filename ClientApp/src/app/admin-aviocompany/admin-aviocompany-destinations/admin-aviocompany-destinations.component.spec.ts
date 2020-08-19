import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAviocompanyDestinationsComponent } from './admin-aviocompany-destinations.component';

describe('AdminAviocompanyDestinationsComponent', () => {
  let component: AdminAviocompanyDestinationsComponent;
  let fixture: ComponentFixture<AdminAviocompanyDestinationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAviocompanyDestinationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAviocompanyDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
