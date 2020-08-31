import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FlightReservation } from '../models/FlightReservation';

@Injectable({
  providedIn: 'root'
})
export class FlightReservationService {

  constructor( private http: HttpClient) { }

  //pravljenje rezervacije
  makeReservation(flightId, reservationInfo)
  {

     return this.http.post<any>(`${environment.api_url}/flightreservation/makeReservation/${flightId}`, reservationInfo);
  }
  //dobavljanje rezervacije
  getReservations(userId)
  {
    return this.http.get<FlightReservation[]>(`${environment.api_url}/flightreservation/getReservations/${userId}`);
  }
  deleteReservation(reservationId)
  {
    return this.http.delete<any>(`${environment.api_url}/flightreservation/deleteReservation/${reservationId}`);
  }

}
