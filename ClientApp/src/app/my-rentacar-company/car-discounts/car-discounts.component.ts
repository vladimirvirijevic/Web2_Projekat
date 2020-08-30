import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentacarAdminService } from 'src/app/services/rentacar-admin.service';
import { CarDiscount } from 'src/app/models/carDiscount';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-discounts',
  templateUrl: './car-discounts.component.html',
  styleUrls: ['./car-discounts.component.css']
})
export class CarDiscountsComponent implements OnInit {
  addDiscountForm: FormGroup;

  selectedCarId = -1;

  cars: Car[] = [];
  carDiscounts: CarDiscount[] = [];

  showErrorMessage = false;
  showSuccessMessage = false;
  errorMessageText = "There was an error!";

  constructor(
    private formBuilder: FormBuilder,
    private rentacarAdminService: RentacarAdminService
  ) {
    this.addDiscountForm = this.formBuilder.group({
      'startDate': ['', [Validators.required]],
      'endDate': ['', [Validators.required]],
      'percent': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    });
   }

  ngOnInit(): void {
    this.getDiscounts();
    this.getCars();
  }

  getCars() {
    this.rentacarAdminService.getCompanyCars()
      .subscribe(
        data => {
          this.cars = data;
        }
      )
  }

  getDiscounts() {
    this.rentacarAdminService.getDiscounts()
      .subscribe(
        data => {
          console.log(data);
          this.carDiscounts = data;
        }
      )
  }

  get startDate() { return this.addDiscountForm.get('startDate'); }
  get endDate() { return this.addDiscountForm.get('endDate'); }
  get percent() { return this.addDiscountForm.get('percent'); }

  onSubmit() {
    if (this.addDiscountForm.invalid || this.selectedCarId == -1) {
      return;
    }

    const discountInfo = {
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      percent: this.percent.value,
      carId: this.selectedCarId
    }

    this.rentacarAdminService.createDiscount(discountInfo)
      .subscribe(
        data => {
          this.getDiscounts();
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
        },
        error => {
          if (error.status == 409) {
            this.errorMessageText = "Start Date is Greater then End Date!";
          }
          else if (error.status == 404) {
            this.errorMessageText = "Discount already exists during that period!";
          }
          this.showSuccessMessage = false;
          this.showErrorMessage = true;
        }
      )
  }

  deleteDiscount(discountId) {
    this.rentacarAdminService.deleteDiscount(discountId)
      .subscribe(
        data => {
          this.getDiscounts();
        }
      )
  }
}
