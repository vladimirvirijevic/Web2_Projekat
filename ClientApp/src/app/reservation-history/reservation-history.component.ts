import { Component, OnInit } from '@angular/core';
import { CarReservation } from '../models/carReservation';
import { CarReservationService } from '../services/car-reservation.service';
import { FlightReservationService } from '../services/flight-reservation.service';
import { FlightReservation } from '../models/FlightReservation';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.css']
})
export class ReservationHistoryComponent implements OnInit {
  carReservations: CarReservation[] = [];
  finishedReservations: CarReservation[] = [];
  currentReservations: CarReservation[] = [];
  reservations: FlightReservation[]=[];

  showDeleteSuccess = false;
  showDeleteError = false;

  errorMessage = "There was an error!";

  constructor(
    private carReservationService: CarReservationService,
    private flightReservationService: FlightReservationService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getCarReservations();
    this.getFlightReservations();
  }

  getCarReservations() {
    this.carReservationService.getUserReservations()
      .subscribe(
        data => {
          this.carReservations = data;
          this.finishedReservations = this.carReservations.filter(x => x.status == "FINISHED");
          this.currentReservations = this.carReservations.filter(x => x.status == "CONFIRMED");
        }
      )
  }

  gradeCarReservation(reservationId) {
    alert(reservationId);
  }

  getFlightReservations()
  {
      this.flightReservationService.getReservations(this.authService.currentUserValue.id).subscribe
      (
        
        data=>
        {
         this.reservations=data;
         console.log(data);
        },
        err=>
        {
         console.log("ne radi");
        }

      );
  }
  OnDeleteReservation(reservationId)
  {
    this.flightReservationService.deleteReservation(reservationId).subscribe
    (
      data=>
      {
       console.log("radi");
       this.getFlightReservations();
      },
      err=>
      {
       console.log("ne radi");
      }

    );
  }

  cancelReservation(reservationId) {
    this.carReservationService.cancelReservation(reservationId)
      .subscribe(
        data => {
          this.getCarReservations();
          this.showDeleteError = false;
          this.showDeleteSuccess = true;
        },
        error => {
          console.log(error);
          if (error.status == 409) {
            this.errorMessage = "You can only cancel reservation two days before pickup date!";
          }

          this.showDeleteError = true;
          this.showDeleteSuccess = false;
        }
      )
  }
}
