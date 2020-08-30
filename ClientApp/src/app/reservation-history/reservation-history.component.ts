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

}
