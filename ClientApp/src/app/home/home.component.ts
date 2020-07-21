import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../services/airline.service';
import { AirplaneCompany } from '../models/airplaneCompany';
import { RentacarService } from '../services/rentacar.service';
import { RentacarCompany } from '../models/rentacarCompany';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  airplaneCompanies: AirplaneCompany[] = [];
  rentacarCompanies: RentacarCompany[] = [];
  showAirplaneFilter = false;
  showRentacarFilter = false;

  constructor(
    private airplaneService: AirlineService,
    private rentacarService: RentacarService
  ) { }

  ngOnInit(): void {
    //this.airplaneCompanies = this.airplaneService.getCompanies();

    this.getAirplaneCompanies();
    this.getRentacarCompanies();
    //this.rentacarCompanies = this.rentacarService.getCompanies();
  }

  getAirplaneCompanies() {
    this.airplaneService.getCompanies()
      .subscribe(
        data => {
          //console.log(data);
          this.airplaneCompanies = data;
        }
      )
  }

  getRentacarCompanies() {
    this.rentacarService.getCompanies()
      .subscribe(
        data => {
          //console.log(data);
          this.rentacarCompanies = data;
        }
      )
  }

  openAirplaneFilter() {
    this.showAirplaneFilter = !this.showAirplaneFilter; 
  }

  openRentacarFilter() {
    this.showRentacarFilter = !this.showRentacarFilter; 
  }

}
