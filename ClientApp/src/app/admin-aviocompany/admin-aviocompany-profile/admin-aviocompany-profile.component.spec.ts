import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAviocompanyProfileComponent } from './admin-aviocompany-profile.component';

describe('AdminAviocompanyProfileComponent', () => {
  let component: AdminAviocompanyProfileComponent;
  let fixture: ComponentFixture<AdminAviocompanyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAviocompanyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAviocompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
