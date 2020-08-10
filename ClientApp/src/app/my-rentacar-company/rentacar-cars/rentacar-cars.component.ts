import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RentacarCompany } from 'src/app/models/rentacarCompany';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RentacarAdminService } from 'src/app/services/rentacar-admin.service';
import { AdminService } from 'src/app/services/admin.service';
import { Branch } from 'src/app/models/branch';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-rentacar-cars',
  templateUrl: './rentacar-cars.component.html',
  styleUrls: ['./rentacar-cars.component.css']
})
export class RentacarCarsComponent implements OnInit {
  addCarForm: FormGroup;
  company: RentacarCompany;

  branches: Branch[] = [];
  cars: Car[] = [];

  mainErrorMessage = "There was an error!";
  showMainErrorMessage = false;

  mainSuccessMessage = "Success!";
  showMainSuccessMessage = false;

  errorMessageText = "There was an error!";

  selectedBranchId: number = -1;

  showSuccessMessage = false;
  showErrorMessage = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private rentacarAdminService: RentacarAdminService,
    private adminService: AdminService
  ) {
    this.addCarForm = this.formBuilder.group({
      'brand': ['', [Validators.required]],
      'model': ['', [Validators.required]],
      'year': ['', [Validators.required]],
      'seats': ['', [Validators.required]],
      'type': ['', [Validators.required]]
    });
   }

   get brand() { return this.addCarForm.get('brand'); }
   get model() { return this.addCarForm.get('model'); }
   get year() { return this.addCarForm.get('year'); }
   get seats() { return this.addCarForm.get('seats'); }
   get type() { return this.addCarForm.get('type'); }

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany() {
    const userId = this.authService.currentUserValue.id;
    this.branches = [];
    this.cars = [];

    this.adminService.getMyCompany(userId)
      .subscribe(
        data => {
          this.company = data;
          this.branches = this.company.branches;
          this.company.branches.forEach(branch => {
            branch.cars.forEach(car => {
              car.branchAddress = branch.address;
              this.cars.push(car);
            });
          });
        }
      )
  }

  onSubmit() {
    if (this.addCarForm.invalid && this.selectedBranchId == -1) {
      return;
    }

    const carInfo = {
      branchId: this.selectedBranchId,
      brand: this.brand.value,
      model: this.model.value,
      year: this.year.value,
      seats: this.seats.value,
      type: this.type.value,
    };

    this.rentacarAdminService.createCar(carInfo)
      .subscribe(
        data => {
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          this.getCompany();
        },
        error => {
          this.showSuccessMessage = false;
          this.showErrorMessage = true;
        }
      );
  }

  deleteCar(carId) {
    this.rentacarAdminService.deleteCar(carId)
      .subscribe(
        data => {
          this.getCompany();
          this.showMainErrorMessage = false;
          this.mainSuccessMessage = "Car deleted successfully!";
          this.showMainSuccessMessage = true;
        },
        error => {
          if (error.status == 409) {
            this.mainErrorMessage = "Failed! Car is reserved";
            this.showMainErrorMessage = true;
            this.showMainSuccessMessage = false;
          }
        }
      );
  } 

}
