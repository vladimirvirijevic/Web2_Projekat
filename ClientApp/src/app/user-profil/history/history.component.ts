import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  oceniClicked:Boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  clickedOceni()
  {
    this.oceniClicked=true;
  }
}
