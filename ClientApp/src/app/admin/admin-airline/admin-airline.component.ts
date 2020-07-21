import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AirlineService } from 'src/app/services/airline.service';
import { AuthUser } from 'src/app/models/authUser';
import { AirplaneCompany } from 'src/app/models/airplaneCompany';

@Component({
  selector: 'app-admin-airline',
  templateUrl: './admin-airline.component.html',
  styleUrls: ['./admin-airline.component.css']
})
export class AdminAirlineComponent implements OnInit {
  showErrorMessage = false;
  errorMessageText = "";
  showSuccessMessage = false;
  selectedAdminId: number = -1;

  airlineAdmins: AuthUser[] = [];
  airlineCompanies: AirplaneCompany[] = [];

  createCompany: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private airlineService: AirlineService
  ) { 
    this.createCompany = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'address': ['', [Validators.required]],
      'description': ['', [Validators.required]]
    });
  }

  get name() { return this.createCompany.get('name'); }
  get address() { return this.createCompany.get('address'); }
  get description() { return this.createCompany.get('description'); }

  ngOnInit(): void {
    this.getAirlineCompanies();
    this.getAirlineAdmins();
  }

  getAirlineAdmins() {
    this.userService.getStaffByRole('AirlineAdmin')
      .subscribe(
        data => {
          this.airlineAdmins = data;
        }
      )
  }

  getAirlineCompanies() {
    this.airlineService.getCompanies()
      .subscribe(
        data => {
          this.airlineCompanies = data;
        }
      )
  }

  onSubmit() {
    if (this.createCompany.invalid || this.selectedAdminId == -1) {
      return;
    }

    const companyInfo = {
      name: this.name.value,
      address: this.address.value,
      description: this.description.value,
      adminId: this.selectedAdminId
    };

    this.airlineService.createCompany(companyInfo)
      .subscribe(
        data => {
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          this.getAirlineCompanies();
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
    // TO DO: send to server..
  }
}
