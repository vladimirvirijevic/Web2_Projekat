import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AirlineService } from '../services/airline.service';
import { Flight } from '../models/Flight';
import { Car } from '../models/car';
import { RentacarService } from '../services/rentacar.service';
import { AuthenticationService } from '../services/authentication.service';
import { DiscountedCar } from '../models/discountedCar';

@Component({
  selector: 'app-fast-car-reservation',
  templateUrl: './fast-car-reservation.component.html',
  styleUrls: ['./fast-car-reservation.component.css']
})
export class FastCarReservationComponent implements OnInit {
  flightId = -1;
  flight: Flight;
  selectedCarId = -1;
  cars: DiscountedCar[] = [];
  selectedDiscountedCar: DiscountedCar;
  returnDate = "";
  userId = -1;

  showSuccessMessage = false;
  showErrorMessage = false;

  errorMessage = "There Was an error!";

  constructor(
    private route: ActivatedRoute,
    private airlineService: AirlineService,
    private rentacarService: RentacarService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.flightId = Number(this.route.snapshot.paramMap.get('flightId'));
    this.getFlight(this.flightId);
    this.getDiscountedCars(this.flightId);
    this.userId = this.authService.currentUserValue.id;
  }

  getFlight(flightId) {
    this.airlineService.getFlight(flightId)
      .subscribe(
        data => {
          console.log(data);
          this.flight = data;
        }
      )
  }

  getDiscountedCars(flightId) {
    this.rentacarService.getDiscountedCars(flightId)
      .subscribe(
        data => {
          console.log(data);
          this.cars = data;
        }
      )
  }

  bookCar() {
    /*
    if (this.selectedCarId == -1 || this.returnDate == "" || this.userId == -1) {
      return null;
    }
    */
    if (this.selectedDiscountedCar == null || this.returnDate == "") {
      return;
    }

    const bookingInfo = {
      carId: this.selectedDiscountedCar.car.id,
      userId: this.userId,
      pickupDate: this.flight.dateOfLanding,
      dropoffDate: this.returnDate,
      discountId: this.selectedDiscountedCar.discount.id,
    }

    console.log(bookingInfo);

    this.rentacarService.fastBookCar(bookingInfo)
      .subscribe(
        data => {
          console.log(data);
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
        },
        error => {
          console.log(error);
          this.showSuccessMessage = false;
          this.showErrorMessage = true;
          
          if (error.status == 409) {
            this.errorMessage = "Pickup Date is greater then Dropoff Date!";
          }
          if (error.status == 404) {
            this.errorMessage = "Car is not available during that period!";
          }
          if (error.status == 403) {
            this.errorMessage = "You cant book date in past!";
          }
        }
      )
  }
}
