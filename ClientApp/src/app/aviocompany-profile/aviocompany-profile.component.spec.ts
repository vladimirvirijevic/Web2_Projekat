import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AviocompanyProfileComponent } from './aviocompany-profile.component';

describe('AviocompanyProfileComponent', () => {
  let component: AviocompanyProfileComponent;
  let fixture: ComponentFixture<AviocompanyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AviocompanyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AviocompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
