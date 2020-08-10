import { Component, OnInit } from '@angular/core';
import { RentacarCompany } from 'src/app/models/rentacarCompany';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RentacarAdminService } from 'src/app/services/rentacar-admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-rentacar-profile',
  templateUrl: './my-rentacar-profile.component.html',
  styleUrls: ['./my-rentacar-profile.component.css']
})
export class MyRentacarProfileComponent implements OnInit {
  company: RentacarCompany;
  editCompany: FormGroup;

  companyExists = false;

  errorMessageText = "";

  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private authService: AuthenticationService,
    private rentacarAdminService: RentacarAdminService
  ) { 
    this.editCompany = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'address': ['', [Validators.required]],
      'description': ['', [Validators.required]],
    });
  }

  get name() { return this.editCompany.get('name'); }
  get address() { return this.editCompany.get('address'); }
  get description() { return this.editCompany.get('description'); }

  ngOnInit(): void {
    this.getCompany();
  }

  setEditFormValues(company) {
    this.editCompany.controls.name.setValue(company.name);
    this.editCompany.controls.address.setValue(company.address);
    this.editCompany.controls.description.setValue(company.description);
  }

  getCompany() {
    const userId = this.authService.currentUserValue.id;

    this.adminService.getMyCompany(userId)
      .subscribe(
        data => {
          this.companyExists = true;
          this.company = data;
          this.setEditFormValues(this.company);
          console.log(data);
        },
        error => {
          this.companyExists = false;
        }
      )
  }

  onSubmit() {
    if (this.editCompany.invalid) {
      return;
    }

    const companyInfo = {
      name: this.name.value,
      address: this.address.value,
      description: this.description.value
    };

    //const userId = this.authService.currentUserValue.id;

    this.rentacarAdminService.editCompany(this.company.id, companyInfo)
      .subscribe(
        data => {
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          this.getCompany();
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
