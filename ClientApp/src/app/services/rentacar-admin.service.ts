import { Injectable } from '@angular/core';
import { RentacarCompany } from '../models/rentacarCompany';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Branch } from '../models/branch';
import { RentacarEarning } from '../models/rentacarEarning';
import { Stats } from '../models/stats';
import { Car } from '../models/car';
import { CarDiscount } from '../models/carDiscount';

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

  deleteDiscount(discountId) {
    return this.http.delete<any>(`${environment.api_url}/rentacaradmin/discount/${discountId}`)
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

  createDiscount(discountInfo) {
    return this.http.post<any>(`${environment.api_url}/rentacaradmin/discount`, discountInfo)
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

  getWeeklyEarnings(week): Observable<RentacarEarning> {
    return this.http.get<RentacarEarning>(`${environment.api_url}/rentacaradmin/weeklyearnings/${week}`);
  }

  getMonthlyEarnings(month): Observable<RentacarEarning> {
    return this.http.get<RentacarEarning>(`${environment.api_url}/rentacaradmin/monthlyearnings/${month}`);
  }

  getDailyStats(day): Observable<Stats> {
    return this.http.get<Stats>(`${environment.api_url}/rentacaradmin/dailystats/${day}`);
  }

  getWeeklyStats(week): Observable<Stats> {
    return this.http.get<Stats>(`${environment.api_url}/rentacaradmin/weeklystats/${week}`);
  }

  getMonthlyStats(month): Observable<Stats> {
    return this.http.get<Stats>(`${environment.api_url}/rentacaradmin/monthlystats/${month}`);
  }

  getCompanyCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${environment.api_url}/rentacaradmin/cars`);
  }

  getDiscounts(): Observable<CarDiscount[]> {
    return this.http.get<CarDiscount[]>(`${environment.api_url}/rentacaradmin/discounts`);
  }
}
