import { Injectable } from '@angular/core';
import { AirplaneCompany } from '../models/airplaneCompany';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

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

  createCompany(companyInfo) {
    return this.http.post<any>(`${environment.api_url}/airline/companies`, companyInfo)
    .pipe(
        catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
