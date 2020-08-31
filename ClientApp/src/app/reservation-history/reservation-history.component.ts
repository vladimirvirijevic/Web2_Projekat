import { Component, OnInit } from '@angular/core';
import { CarReservation } from '../models/carReservation';
import { CarReservationService } from '../services/car-reservation.service';

@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.css']
})
export class ReservationHistoryComponent implements OnInit {
  carReservations: CarReservation[] = [];
  finishedReservations: CarReservation[] = [];
  currentReservations: CarReservation[] = [];

  showDeleteSuccess = false;
  showDeleteError = false;

  errorMessage = "There was an error!";

  constructor(
    private carReservationService: CarReservationService
  ) { }

  ngOnInit(): void {
    this.getCarReservations();
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
