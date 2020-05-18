import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedListComponent } from './reserved-list.component';

describe('ReservedListComponent', () => {
  let component: ReservedListComponent;
  let fixture: ComponentFixture<ReservedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
