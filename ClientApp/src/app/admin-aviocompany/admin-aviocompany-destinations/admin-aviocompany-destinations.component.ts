import { Component, OnInit } from '@angular/core';
import { AirplaneCompany } from 'src/app/models/airplaneCompany';
import { AirlineService } from 'src/app/services/airline.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AirlineAdminService } from 'src/app/services/airline-admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-aviocompany-destinations',
  templateUrl: './admin-aviocompany-destinations.component.html',
  styleUrls: ['./admin-aviocompany-destinations.component.css']
})
export class AdminAviocompanyDestinationsComponent implements OnInit {
  public company:AirplaneCompany;
  public companies:AirplaneCompany[];
  public locations:Location[];
  addLocationForm: FormGroup;


  errorMessageText = "";

  mainErrorMessage = "There was an error!";
  showMainErrorMessage = false;

  mainSuccessMessage = "Success!";
  showMainSuccessMessage = false;

  showSuccessMessage = false;
  showErrorMessage = false;


  constructor(
    public airlineService:AirlineService,
    public authenticateService: AuthenticationService,
    public adminAirlineService: AirlineAdminService,
    public formBuilder: FormBuilder
  ) {
    this.addLocationForm = this.formBuilder.group({
      'address': ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.checkCompany();
    
   
  }

 
  get address() { return this.addLocationForm.get('address');};
  
  checkCompany()
  {
    this.airlineService.getCompanies()
    .subscribe(
      data => {
        console.log(data);
        this.companies=data;

        this.companies.forEach(element => {
          if(element.admin.id==this.authenticateService.currentUserValue.id)
          {
            this.company=element; 
            console.log("kompanija");
            console.log(this.company);
            this.getLocations();

          }
        });
      
      },
      error => {
       console.log("ne radi");
      }
    );
  }
  getLocations(){
    this.adminAirlineService.getLocations(this.company.id).subscribe
    (
        data=>
        {
          console.log(data);
          this.locations=data;
          console.log("Lokacije");
          console.log(this.locations);
        },
        error => {
          console.log("ne radi");
         }
    );
    
  }
  onSubmit() {
    if (this.addLocationForm.invalid) {
      return;
    }

    const locationInfo=
    {
      address:this.address.value
    };

    this.adminAirlineService.addLocation(this.company.id, locationInfo).subscribe
    (
        data=>
        {
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          
        },
        err=>
        {
            console.log("ne radi");
          this.errorMessageText = "There was an error.";
          this.showSuccessMessage = false;
          this.showErrorMessage = true;
        }
    );
    
 }

 deleteLocation(locationId)
 {
    this.adminAirlineService.deleteLocation(locationId).subscribe
    (
      data=>
      {
        this.getLocations();
      },
      err=>
      {
       console.log("ne radi");
      }
    );
 }

}
