import { Component, OnInit } from '@angular/core';
import { AirplaneCompany } from 'src/app/models/airplaneCompany';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AirlineService } from 'src/app/services/airline.service';

@Component({
  selector: 'app-admin-aviocompany-profile',
  templateUrl: './admin-aviocompany-profile.component.html',
  styleUrls: ['./admin-aviocompany-profile.component.css']
})
export class AdminAviocompanyProfileComponent implements OnInit {
  public company:AirplaneCompany;
  public companies:AirplaneCompany[];
  constructor(
    public authenticateService: AuthenticationService,
    public airlineService:AirlineService
  ) { }

  ngOnInit(): void {
    this.checkCompany();
  }

  checkCompany()
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
          }
        });
      
      },
      error => {
       console.log("ne radi");
      }
    );
  }
}
