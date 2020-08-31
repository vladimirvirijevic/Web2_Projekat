import { Injectable } from '@angular/core';
import { AirplaneCompany } from '../models/airplaneCompany';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Flight } from '../models/Flight';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  constructor(
    private http: HttpClient
  ) { }

 // private url = 'https://localhost:44347/api/airline';

  getCompanies(): Observable<AirplaneCompany[]> {
    return this.http.get<AirplaneCompany[]>(`${environment.api_url}/airline/getCompanies`);
  }

  getCompany(companyId): Observable<AirplaneCompany> {
    return this.http.get<AirplaneCompany>(`${environment.api_url}/airline/companies/${companyId}`);
  }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${environment.api_url}/airline/flights`);
  }

  getFlight(flightId): Observable<Flight> {
    return this.http.get<Flight>(`${environment.api_url}/airline/flights/${flightId}`);
  }

  createCompany(companyInfo) {
    return this.http.post<any>(`${environment.api_url}/airline/companies`, companyInfo)
    .pipe(
        catchError(this.handleError)
    );
  }

  searchCompanies(searchInfo) {
    return this.http.post<any>(`${environment.api_url}/airline/searchcompanies`, searchInfo)
    .pipe(
        catchError(this.handleError)
    );
  }

  searchFlights(searchInfo) {
    return this.http.post<any>(`${environment.api_url}/airline/searchflights`, searchInfo)
    .pipe(
        catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
