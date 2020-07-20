import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterModel } from '../models/registerModel';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    register(user: RegisterModel) {
        return this.http.post<any>(`${environment.api_url}/users/register`, user)
        .pipe(
            catchError(this.handleError)
        );
    }

    changeUsername(userInfo) {
        return this.http.put<any>(`${environment.api_url}/users/changeusername`, userInfo)
            .pipe(
                catchError(this.handleError)
            );
    }
    
    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }

    changePassword(userInfo) {
        return this.http.put<any>(`${environment.api_url}/users/changepassword`, userInfo);
    }
}