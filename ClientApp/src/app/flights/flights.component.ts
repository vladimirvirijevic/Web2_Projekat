import { Component, OnInit } from '@angular/core';
import { AirplaneService } from '../services/airplane.service';
import { AirplaneCompany } from '../models/airplaneCompany';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  showAirplaneFilter = false;
  airplaneCompanies: AirplaneCompany[] = [];

  constructor(
    private airplaneService: AirplaneService
  ) { }

  ngOnInit(): void {
    this.getAirplaneCompanies();
  }

  getAirplaneCompanies() {
    this.airplaneService.getCompanies()
      .subscribe(
        data => {
          this.airplaneCompanies = data;
        }
      )
  }

  openAirplaneFilter() {
    this.showAirplaneFilter = !this.showAirplaneFilter; 
  }
}
