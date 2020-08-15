import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAviocompanyComponent } from './admin-aviocompany.component';

describe('AdminAviocompanyComponent', () => {
  let component: AdminAviocompanyComponent;
  let fixture: ComponentFixture<AdminAviocompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAviocompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAviocompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
