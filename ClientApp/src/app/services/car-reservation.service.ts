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

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
