import { Injectable } from '@angular/core';
import { RentacarCompany } from '../models/rentacarCompany';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Branch } from '../models/branch';
import { RentacarEarning } from '../models/rentacarEarning';

@Injectable({
  providedIn: 'root'
})
export class RentacarAdminService {

  constructor(
    private http: HttpClient
  ) { }

  editCompany(companyId, companyInfo) {
    return this.http.put<any>(`${environment.api_url}/rentacaradmin/editcompany/${companyId}`, companyInfo)
    .pipe(
        catchError(this.handleError)
    );
  }

  createBranch(branchInfo) {
    return this.http.post<any>(`${environment.api_url}/rentacaradmin/branch`, branchInfo)
    .pipe(
        catchError(this.handleError)
    );
  }

  deleteCar(carId) {
    return this.http.delete<any>(`${environment.api_url}/rentacaradmin/car/${carId}`)
    .pipe(
        catchError(this.handleError)
    );
  }

  deleteBranch(branchId) {
    return this.http.delete<any>(`${environment.api_url}/rentacaradmin/branch/${branchId}`)
    .pipe(
        catchError(this.handleError)
    );
  }

  createCar(carInfo) {
    return this.http.post<any>(`${environment.api_url}/rentacaradmin/car`, carInfo)
    .pipe(
        catchError(this.handleError)
    );
  }

  getBranches(companyId): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${environment.api_url}/rentacaradmin/brances/${companyId}`);
  }


  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  editCar(cardId, editInfo) {
    return this.http.put<any>(`${environment.api_url}/rentacaradmin/car/${cardId}`, editInfo)
    .pipe(
        catchError(this.handleError)
    );
  }

  editBanch(branchId, editInfo) {
    return this.http.put<any>(`${environment.api_url}/rentacaradmin/branch/${branchId}`, editInfo)
    .pipe(
        catchError(this.handleError)
    );
  }

  getDailyEarnings(day): Observable<RentacarEarning> {
    return this.http.get<RentacarEarning>(`${environment.api_url}/rentacaradmin/dailyearnings/${day}`);
  }
}
