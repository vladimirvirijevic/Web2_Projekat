import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserved-list',
  templateUrl: './reserved-list.component.html',
  styleUrls: ['./reserved-list.component.css']
})
export class ReservedListComponent implements OnInit {
  oceniClicked:Boolean;
  constructor() { }

  ngOnInit(): void {
  }
  public clickedOceni()
  {
    this.oceniClicked=true;
  }
}
