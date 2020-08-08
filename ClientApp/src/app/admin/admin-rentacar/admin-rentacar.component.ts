import { Component, OnInit } from '@angular/core';
import { RentacarCompany } from 'src/app/models/rentacarCompany';
import { AuthUser } from 'src/app/models/authUser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { RentacarService } from 'src/app/services/rentacar.service';

@Component({
  selector: 'app-admin-rentacar',
  templateUrl: './admin-rentacar.component.html',
  styleUrls: ['./admin-rentacar.component.css']
})
export class AdminRentacarComponent implements OnInit {

  rentacarCompanies: RentacarCompany[] = [];
  selectedAdminId: number = -1;
  errorMessageText = "";

  rentacarAdmins: AuthUser[] = [];
  createCompany: FormGroup;

  showSuccessMessage = false;
  showErrorMessage = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private rentacarService: RentacarService
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
    this.getCompanies();
    this.getRentacarAdmins();
  }

  getCompanies() {
    this.rentacarService.getCompanies()
      .subscribe(
        data => {
          this.rentacarCompanies = data;
        }
      )
  }

  getRentacarAdmins() {
    this.userService.getStaffByRole('RentacarAdmin')
      .subscribe(
        data => {
          this.rentacarAdmins = data;
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

    this.rentacarService.createCompany(companyInfo)
      .subscribe(
        data => {
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          this.getCompanies();
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
