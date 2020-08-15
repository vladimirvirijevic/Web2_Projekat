import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AirlineService } from '../services/airline.service';
import { AirplaneCompany } from '../models/airplaneCompany';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-aviocompany',
  templateUrl: './admin-aviocompany.component.html',
  styleUrls: ['./admin-aviocompany.component.css']
})
export class AdminAviocompanyComponent implements OnInit {
     public company:AirplaneCompany;
     public companies:AirplaneCompany[];
     public avioCompanyExists:Boolean=false;
  constructor(
    public authenticateService: AuthenticationService,
    public airlineService:AirlineService
    ) { }

  ngOnInit(): void {
    this.findCompany();
  }

  findCompany()
  {
    this.airlineService.getCompanies()
    .subscribe(
      data => {
        console.log(data);
       
        this.companies=data;
        console.log(this.companies);

        this.companies.forEach(element => {
          if(element.admin.id==this.authenticateService.currentUserValue.id)
          {
            this.company=element;
             this.avioCompanyExists=true;
          }
        });
      
      },
      error => {
       
       this.avioCompanyExists=false;
      }
    );
  }
}
