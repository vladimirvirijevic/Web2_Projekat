import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RentacarCompany } from 'src/app/models/rentacarCompany';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RentacarAdminService } from 'src/app/services/rentacar-admin.service';
import { AdminService } from 'src/app/services/admin.service';
import { Branch } from 'src/app/models/branch';
import { Car } from 'src/app/models/car';
import { RentacarService } from 'src/app/services/rentacar.service';

@Component({
  selector: 'app-rentacar-cars',
  templateUrl: './rentacar-cars.component.html',
  styleUrls: ['./rentacar-cars.component.css']
})
export class RentacarCarsComponent implements OnInit {
  addCarForm: FormGroup;
  editCarForm: FormGroup;
  company: RentacarCompany;

  editCarId = -1;

  selectedType = "Any";
  selectedAddType = "Any";

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

  editErrorMessageText = "There was an error!";
  showEditSuccessMessage = false;
  showEditErrorMessage = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private rentacarAdminService: RentacarAdminService,
    private rentacarService: RentacarService,
    private adminService: AdminService
  ) {
    this.addCarForm = this.formBuilder.group({
      'brand': ['', [Validators.required]],
      'model': ['', [Validators.required]],
      'year': ['', [Validators.required]],
      'seats': ['', [Validators.required]],
      //'type': ['', [Validators.required]],
      //'availableFrom': ['', [Validators.required]],
      //'availableUntil': ['', [Validators.required]],
      'pickupLocation': ['', [Validators.required]],
      'pricePerDay': ['', [Validators.required]],
      'dropoffLocation': ['', [Validators.required]],
    });

    this.editCarForm = this.formBuilder.group({
      'brand': ['', [Validators.required]],
      'model': ['', [Validators.required]],
      'year': ['', [Validators.required]],
      'seats': ['', [Validators.required]],
      //'type': ['', [Validators.required]],
      //'availableFrom': ['', [Validators.required]],
      //'availableUntil': ['', [Validators.required]],
      'pickupLocation': ['', [Validators.required]],
      'pricePerDay': ['', [Validators.required]],
      'dropoffLocation': ['', [Validators.required]],
    });
   }

   get brand() { return this.addCarForm.get('brand'); }
   get model() { return this.addCarForm.get('model'); }
   get year() { return this.addCarForm.get('year'); }
   get seats() { return this.addCarForm.get('seats'); }
   //get type() { return this.addCarForm.get('type'); }
   //get availableFrom() { return this.addCarForm.get('availableFrom'); }
   //get availableUntil() { return this.addCarForm.get('availableUntil'); }
   get pickupLocation() { return this.addCarForm.get('pickupLocation'); }
   get dropoffLocation() { return this.addCarForm.get('dropoffLocation'); }
   get pricePerDay() { return this.addCarForm.get('pricePerDay'); }

   get brandEdit() { return this.editCarForm.get('brand'); }
   get modelEdit() { return this.editCarForm.get('model'); }
   get yearEdit() { return this.editCarForm.get('year'); }
   get seatsEdit() { return this.editCarForm.get('seats'); }
   //get typeEdit() { return this.addCarForm.get('type'); }
   get pickupLocationEdit() { return this.editCarForm.get('pickupLocation'); }
   get dropoffLocationEdit() { return this.editCarForm.get('dropoffLocation'); }
   get pricePerDayEdit() { return this.editCarForm.get('pricePerDay'); }

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
      type: this.selectedAddType,
      pricePerDay: this.pricePerDay.value,
      pickupLocation: this.pickupLocation.value,
      dropoffLocation: this.dropoffLocation.value,
    };

    this.rentacarAdminService.createCar(carInfo)
      .subscribe(
        data => {
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          this.getCompany();
        },
        error => {
          console.log(error);
          if (error.status == 409) {
            this.errorMessageText = "Available From Date is greated then Available Until Date!";
            this.showSuccessMessage = false;
            this.showErrorMessage = true;
          }
          else {
            this.showSuccessMessage = false;
            this.showErrorMessage = true;
          }
          
        }
      );
  }

  editCar(carId) {
    this.rentacarService.getCar(carId)
      .subscribe(
        data => {
          this.editCarId = carId;
          this.editCarForm.controls.brand.setValue(data.brand);
          this.editCarForm.controls.model.setValue(data.model);
          this.editCarForm.controls.year.setValue(data.year);
          this.editCarForm.controls.seats.setValue(data.seats);
          this.editCarForm.controls.pickupLocation.setValue(data.pickupLocation);
          this.editCarForm.controls.dropoffLocation.setValue(data.dropoffLocation);
          this.editCarForm.controls.pricePerDay.setValue(data.pricePerDay);
        }
      )
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
            this.mainErrorMessage = "Failed! Car is booked!";
            this.showMainErrorMessage = true;
            this.showMainSuccessMessage = false;
          }
        }
      );
  } 

  onEdit() {
    if (this.editCarForm.invalid || this.editCarId == -1) {
      return;
    }

    const carId = this.editCarId;

    const editInfo = {
      brand: this.brandEdit.value,
      model: this.modelEdit.value,
      year: this.yearEdit.value,
      seats: this.seatsEdit.value,
      type: this.selectedType,
      pricePerDay: this.pricePerDayEdit.value,
      pickupLocation: this.pickupLocationEdit.value,
      dropoffLocation: this.dropoffLocationEdit.value,
    };

    this.rentacarAdminService.editCar(carId, editInfo)
      .subscribe(
        data => {
          this.getCompany();
          this.showEditErrorMessage = false;
          this.mainSuccessMessage = "Car edited successfully!";
          this.showEditSuccessMessage = true;
          this.showMainErrorMessage = false;
        },
        error => {
          if (error.status == 409) {
            this.editErrorMessageText = "Failed! Car is booked!";
            this.showEditErrorMessage = true;
            this.showEditSuccessMessage = false;
          }
        }
      )
  }
}
