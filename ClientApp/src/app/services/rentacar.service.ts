import { Injectable } from '@angular/core';
import { RentacarCompany } from '../models/rentacarCompany';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class RentacarService {

  constructor(
    private http: HttpClient
  ) { }
  
  getCompanies(): Observable<RentacarCompany[]> {
    return this.http.get<RentacarCompany[]>(`${environment.api_url}/rentacar`);
  }

  getCompany(id): Observable<RentacarCompany> {
    return this.http.get<RentacarCompany>(`${environment.api_url}/rentacar/${id}`);
  }

  getCar(carId): Observable<Car> {
    return this.http.get<Car>(`${environment.api_url}/rentacar/car/${carId}`);
  }

  createCompany(companyInfo) {
    return this.http.post<any>(`${environment.api_url}/rentacar/companies`, companyInfo)
    .pipe(
        catchError(this.handleError)
    );
  }
  

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  searchCompanies(searchInfo) {
    return this.http.post<any>(`${environment.api_url}/rentacar/search`, searchInfo)
    .pipe(
        catchError(this.handleError)
    );
  }

  bookCar(bookingInfo) {
    return this.http.post<any>(`${environment.api_url}/rentacar/book`, bookingInfo)
    .pipe(
        catchError(this.handleError)
    );
  }

  searchCars(searchInfo) {
    return this.http.post<any>(`${environment.api_url}/rentacar/searchcars`, searchInfo)
    .pipe(
        catchError(this.handleError)
    );
  }

  getCars(companyId): Observable<Car[]> {
    return this.http.get<Car[]>(`${environment.api_url}/rentacar/${companyId}/cars`);
  }
}
