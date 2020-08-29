import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvioCompanyFromListComponent } from './avio-company-from-list.component';

describe('AvioCompanyFromListComponent', () => {
  let component: AvioCompanyFromListComponent;
  let fixture: ComponentFixture<AvioCompanyFromListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvioCompanyFromListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvioCompanyFromListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
