import { Component, OnInit } from '@angular/core';
import { CarReservation } from 'src/app/models/carReservation';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CarReservationService } from 'src/app/services/car-reservation.service';

@Component({
  selector: 'app-rentacar-reservations',
  templateUrl: './rentacar-reservations.component.html',
  styleUrls: ['./rentacar-reservations.component.css']
})
export class RentacarReservationsComponent implements OnInit {
  reservations: CarReservation[];

  showErrorMessage = false;
  showSuccessMessage = false;

  errorMessage = "There was an error!";

  constructor(
    private authService: AuthenticationService,
    private carReservationService: CarReservationService
  ) { }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    const adminId = this.authService.currentUserValue.id;

    this.carReservationService.getAdminReservations(adminId)
      .subscribe(
        data => {
          console.log(data);
          this.reservations = data;
        }
      )
  }

  finishReservations(reservationId) {
    const info = {
      status: 'FINISHED'
    };

    this.carReservationService.finish(reservationId, info)
      .subscribe(
        data => {
          this.getReservations();
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
        },
        error => {
          this.showSuccessMessage = false;
          this.showErrorMessage = true;

          if (error.status == 409) {
            this.errorMessage = "Reservation isn`t finished yet!";
          }
        }
      )
  }
}
