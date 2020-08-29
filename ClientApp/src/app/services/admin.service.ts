import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BonusInfo } from '../models/bonusInfo';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  getMyCompany(userId) {
    return this.http.get<any>(`${environment.api_url}/admin/mycompany/${userId}`)
    .pipe(
        catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getBonusInfo(): Observable<BonusInfo> {
    return this.http.get<BonusInfo>(`${environment.api_url}/admin/bonus`);
  }

  editBonusInfo(bonusInfo) {
    return this.http.post<any>(`${environment.api_url}/admin/bonus`, bonusInfo)
    .pipe(
        catchError(this.handleError)
    );
  }
}
