import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { CarReservation } from '../models/carReservation';

@Injectable({
  providedIn: 'root'
})
export class CarReservationService {

  constructor(
    private http: HttpClient
  ) { }

  getAdminReservations(adminId): Observable<CarReservation[]> {
    return this.http.get<CarReservation[]>(`${environment.api_url}/carreservation/company/${adminId}`)
    .pipe(
        catchError(this.handleError)
    );
  }

  finish(reservationId, info) {
    return this.http.put<any>(`${environment.api_url}/carreservation/finish/${reservationId}`, info)
    .pipe(
        catchError(this.handleError)
    );
  }

  gradeCar(gradeCarInfo) {
    return this.http.post<any>(`${environment.api_url}/carreservation/reservation/rentacar/gradecar`, gradeCarInfo)
    .pipe(
        catchError(this.handleError)
    );
  }

  gradeCompany(gradeCompanyInfo) {
    return this.http.post<any>(`${environment.api_url}/carreservation/reservation/rentacar/gradecompany`, gradeCompanyInfo)
    .pipe(
        catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getUserReservations(): Observable<CarReservation[]> {
    return this.http.get<CarReservation[]>(`${environment.api_url}/carreservation/reservations`);
  }

  getReservation(reservationId): Observable<CarReservation> {
    return this.http.get<CarReservation>(`${environment.api_url}/carreservation/reservations/${reservationId}`);
  }

  getCarGrade(carId): Observable<number> {
    return this.http.get<number>(`${environment.api_url}/carreservation/car/grade/${carId}`);
  }
}
