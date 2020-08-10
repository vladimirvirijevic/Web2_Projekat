import { Injectable } from '@angular/core';
import { RentacarCompany } from '../models/rentacarCompany';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

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

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
