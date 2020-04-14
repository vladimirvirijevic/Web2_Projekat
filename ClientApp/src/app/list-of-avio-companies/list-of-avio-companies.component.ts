import { Component, OnInit } from '@angular/core';
import { AirplaneService } from '../services/airplane.service';
import { AirplaneCompany } from '../models/airplaneCompany';
import { RentacarService } from '../services/rentacar.service';
import { RentacarCompany } from '../models/rentacarCompany';

@Component({
  selector: 'app-list-of-avio-companies',
  templateUrl: './list-of-avio-companies.component.html',
  styleUrls: ['./list-of-avio-companies.component.css']
})
export class ListOfAvioCompaniesComponent implements OnInit {
  airplaneCompanies: AirplaneCompany[] = [];
  rentacarCompanies: RentacarCompany[] = [];
  clickedFilter:Boolean=false;
 

  constructor( private airplaneService: AirplaneService,
    private rentacarService: RentacarService) { }

  ngOnInit(): void {

  this.airplaneCompanies = this.airplaneService.getCompanies();
    this.rentacarCompanies = this.rentacarService.getCompanies();
  }
  ClickedFilter()
  {
    this.clickedFilter=true;
  }
}
