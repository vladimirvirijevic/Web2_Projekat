import { Component, OnInit } from '@angular/core';
import { AirplaneCompany } from 'src/app/models/airplaneCompany';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AirlineService } from 'src/app/services/airline.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AirlineAdminService } from 'src/app/services/airline-admin.service';

@Component({
  selector: 'app-admin-aviocompany-profile',
  templateUrl: './admin-aviocompany-profile.component.html',
  styleUrls: ['./admin-aviocompany-profile.component.css']
})
export class AdminAviocompanyProfileComponent implements OnInit {
  public company:AirplaneCompany;
  public companies:AirplaneCompany[];
  editCompany: FormGroup;

  companyExists = false;

  errorMessageText = "";

  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(
    public authenticateService: AuthenticationService,
    public airlineService:AirlineService,
    public airlineAdminService: AirlineAdminService,
    public formBuilder: FormBuilder,
  ) { 
    this.editCompany = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'address': ['', [Validators.required]],
      'description': ['', [Validators.required]]
    });
  }

  get name() { return this.editCompany.get('name'); }
  get address() { return this.editCompany.get('address'); }
  get description() { return this.editCompany.get('description'); }


  ngOnInit(): void {
    this.checkCompany();
  }
  setEditFormValues(company) {
    this.editCompany.controls.name.setValue(company.name);
    this.editCompany.controls.address.setValue(company.address);
    this.editCompany.controls.description.setValue(company.description);
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
            this.setEditFormValues(this.company);
          }
        });
      
      },
      error => {
       console.log("ne radi");
      }
    );
  }
  onSubmit()
  {
    
    const companyInfo = {
      name: this.name.value,
      address: this.address.value,
      description: this.description.value
    };

    this.airlineAdminService.editCompany(this.company.id, companyInfo)
    .subscribe(
      data => {
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
        this.checkCompany();
      },
      error => {
        if (error.status == 409) {
          this.errorMessageText = "Company with the same name already exists.";
        }
        else {
          this.errorMessageText = "There was an error.";
        }
        this.showSuccessMessage = false;
        this.showErrorMessage = true;
      }
    );

  }



}
