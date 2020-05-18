import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfRentacarCompaniesComponent } from './list-of-rentacar-companies.component';

describe('ListOfRentacarCompaniesComponent', () => {
  let component: ListOfRentacarCompaniesComponent;
  let fixture: ComponentFixture<ListOfRentacarCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfRentacarCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfRentacarCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
