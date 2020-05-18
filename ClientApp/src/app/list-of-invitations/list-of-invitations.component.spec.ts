import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfInvitationsComponent } from './list-of-invitations.component';

describe('ListOfInvitationsComponent', () => {
  let component: ListOfInvitationsComponent;
  let fixture: ComponentFixture<ListOfInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
