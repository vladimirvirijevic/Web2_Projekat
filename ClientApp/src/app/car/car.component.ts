import { Component, OnInit } from '@angular/core';
import { RentacarService } from '../services/rentacar.service';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../models/car';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  carId: number;
  car: Car;
  bookingForm: FormGroup;

  showSuccessMessage = false;
  showErrorMessage = false;
  errorMessage = "There was an error!";

  constructor(
    private formBuilder: FormBuilder,
    private rentacarService: RentacarService,
    private route: ActivatedRoute,
    private location: Location,
    public authService: AuthenticationService
  ) {
    this.bookingForm = this.formBuilder.group({
      'pickupDate': ['', [Validators.required]],
      'dropoffDate': ['', [Validators.required]]
    });
   }

   get pickupDate() { return this.bookingForm.get('pickupDate'); }
   get dropoffDate() { return this.bookingForm.get('dropoffDate'); }

  ngOnInit(): void {
    this.carId = Number(this.route.snapshot.paramMap.get('id'));
    //this.company = this.rentacarService.getCompany(this.companyId);

    this.getCar(this.carId);
  }

  onSubmit() {
    if (this.bookingForm.invalid) {
      return;
    }

    const bookingInfo = {
      userId: this.authService.currentUserValue.id,
      carId: this.carId,
      pickupDate: this.pickupDate.value,
      dropoffDate: this.dropoffDate.value
    };

    this.rentacarService.bookCar(bookingInfo)
      .subscribe(
        data => {
          console.log(data);
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
        },
        error => {
          this.showSuccessMessage = false;
          this.showErrorMessage = true;
          
          if (error.status == 409) {
            this.errorMessage = "Pickup Date is greater then Dropoff Date!";
          }
          if (error.status == 404) {
            this.errorMessage = "Car is not available during that period!";
          }
        }
      )
  }

  getCar(carId) {
    this.rentacarService.getCar(carId)
      .subscribe(
        data => {
          console.log(data);
          this.car = data;
        },
        error => {
          console.log(error);
        }
      )
  }

  goBack() {
    this.location.back();
  }

}
