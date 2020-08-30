import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarReservationService } from 'src/app/services/car-reservation.service';
import { CarReservation } from 'src/app/models/carReservation';

@Component({
  selector: 'app-rentacar-grade',
  templateUrl: './rentacar-grade.component.html',
  styleUrls: ['./rentacar-grade.component.css']
})
export class RentacarGradeComponent implements OnInit {
  reservationId = -1;

  carGrade = 0;
  companyGrade = 0;

  reservation: CarReservation;

  showGradeCarSuccess = false;
  showGradeCarError = false;

  showGradeCompanySuccess = false;
  showGradeCompanyError = false;

  selectedCarGrade = -1;
  selectedComanyGrade = -1;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private carReservationService: CarReservationService
  ) {
    
   }

  ngOnInit(): void {
    this.reservationId = Number(this.route.snapshot.paramMap.get('reservationId'));
    this.getReservation(this.reservationId);    
  }

  getReservation(reservationId) {
    this.carReservationService.getReservation(reservationId)
      .subscribe(
        data => {
          console.log(data);
          this.reservation = data;
          this.getCarGrade(this.reservation.car.id);
          this.companyGrade = this.calculateCompanyGrade(data.car.branch.company.grades);
        }
      )
  }

  calculateCompanyGrade(grades) {
    let total = 0;

    grades.forEach(g => {
      total += g.grade;
    });

    return total / grades.length;
  }

  getCarGrade(carId) {
    this.carReservationService.getCarGrade(carId)
      .subscribe(
        data => {
          console.log(data);
          this.carGrade = data;
        }
      )
  }

  onGradeCar() {
    if (this.selectedCarGrade == -1) {
      return;
    }

    const carGradeInfo = {
      grade: this.selectedCarGrade,
      reservationId: this.reservationId
    }

    this.carReservationService.gradeCar(carGradeInfo)
      .subscribe(
        data => {
          this.getReservation(this.reservationId);
          this.showGradeCarSuccess = true;
          this.showGradeCarError = false;

          this.showGradeCompanySuccess = false;
          this.showGradeCompanyError = false;
        },
        error => {
          this.showGradeCarSuccess = false;
          this.showGradeCarError = true;

          this.showGradeCompanySuccess = false;
          this.showGradeCompanyError = false;
        }
      )
  }

  onGradeCompany() {
    if (this.selectedComanyGrade == -1) {
      return;
    }

    const companyGradeInfo = {
      grade: this.selectedComanyGrade,
      reservationId: this.reservationId
    }

    this.carReservationService.gradeCompany(companyGradeInfo)
      .subscribe(
        data => {
          this.getReservation(this.reservationId);
          this.showGradeCompanySuccess = true;
          this.showGradeCompanyError = false;

          this.showGradeCarSuccess = false;
          this.showGradeCarError = false;
        },
        error => {
          this.showGradeCompanySuccess = false;
          this.showGradeCompanyError = true;

          this.showGradeCarSuccess = false;
          this.showGradeCarError = false;
        }
      )
  }

  goBack() {
    this.location.back();
  }

}
