import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../services/airline.service';
import { AirplaneCompany } from '../models/airplaneCompany';
import { RentacarCompany } from '../models/rentacarCompany';

@Component({
  selector: 'app-list-of-avio-companies',
  templateUrl: './list-of-avio-companies.component.html',
  styleUrls: ['./list-of-avio-companies.component.css']
})
export class ListOfAvioCompaniesComponent implements OnInit {
  airplaneCompanies: AirplaneCompany[]=[];
  clickedFilter:Boolean=false;
  emptyMessege:Boolean;

  constructor( private airplaneService: AirlineService) { }

  ngOnInit(): void {

    
   
  }

  getCompanies()
  {
    this.airplaneService.getCompanies()
    .subscribe(
      data => {
        console.log(data);
        this.airplaneCompanies = data;
      }
    )
  }
  
}
