import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RentacarAdminService } from 'src/app/services/rentacar-admin.service';
import { RentacarCompany } from 'src/app/models/rentacarCompany';
import { AdminService } from 'src/app/services/admin.service';
import { Branch } from 'src/app/models/branch';

@Component({
  selector: 'app-rentacar-branch',
  templateUrl: './rentacar-branch.component.html',
  styleUrls: ['./rentacar-branch.component.css']
})
export class RentacarBranchComponent implements OnInit {
  addBranchForm: FormGroup;
  company: RentacarCompany;
  branches: Branch[] = [];

  errorMessageText = "";

  mainErrorMessage = "There was an error!";
  showMainErrorMessage = false;

  mainSuccessMessage = "Success!";
  showMainSuccessMessage = false;

  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private rentacarAdminService: RentacarAdminService,
    private adminService: AdminService
  ) {
    this.addBranchForm = this.formBuilder.group({
      'address': ['', [Validators.required]]
    });
   }

   get address() { return this.addBranchForm.get('address'); }

  ngOnInit(): void {
    this.getCompany();
  }

  getBranches() {
    this.rentacarAdminService.getBranches(this.company.id)
      .subscribe(
        data => {
          this.branches = data;
        }
      )
  }

  getCompany() {
    const userId = this.authService.currentUserValue.id;

    this.adminService.getMyCompany(userId)
      .subscribe(
        data => {
          this.company = data;
        }
      )
  }

  onSubmit() {
    if (this.addBranchForm.invalid) {
      return;
    }

    const branchInfo = {
      address: this.address.value,
      companyId: this.company.id
    };

    this.rentacarAdminService.createBranch(branchInfo)
      .subscribe(
        data => {
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          this.getCompany();
        },
        error => {
          if (error.status == 409) {
            this.errorMessageText = "Branch with the same address already exists.";
          }
          else {
            this.errorMessageText = "There was an error.";
          }
          this.showSuccessMessage = false;
          this.showErrorMessage = true;
        }
      );
  }

  deleteBranch(branchId) {
    this.rentacarAdminService.deleteBranch(branchId)
      .subscribe(
        data => {
          this.getCompany();
          this.showMainErrorMessage = false;
          this.mainSuccessMessage = "Branch deleted successfully!";
          this.showMainSuccessMessage = true;
        },
        error => {
          console.log(error.status);
          if (error.status == 409) {
            this.mainErrorMessage = "You must delete branch cars before deleting this branch!";
            this.showMainErrorMessage = true;
            this.showMainSuccessMessage = false;
          }
        }
      );
  }
}
