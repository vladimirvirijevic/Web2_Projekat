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
}
