import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAvioCompaniesComponent } from './list-of-avio-companies.component';

describe('ListOfAvioCompaniesComponent', () => {
  let component: ListOfAvioCompaniesComponent;
  let fixture: ComponentFixture<ListOfAvioCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfAvioCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfAvioCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
