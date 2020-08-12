import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterModel } from '../models/registerModel';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { User } from '../models/User';
import { AuthUser } from '../models/authUser';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    register(user: RegisterModel) {
        return this.http.post<any>(`${environment.api_url}/users/register`, user)
        .pipe(
            catchError(this.handleError)
        );
    }

    create(user: RegisterModel) {
        return this.http.post<any>(`${environment.api_url}/admin/staff`, user)
        .pipe(
            catchError(this.handleError)
        );
    }

    getStaff(): Observable<AuthUser[]> {
        return this.http.get<AuthUser[]>(`${environment.api_url}/admin/staff`);
    }

    getStaffByRole(role): Observable<AuthUser[]> {
        return this.http.get<AuthUser[]>(`${environment.api_url}/admin/staff/${role}`);
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
    
    editUser(userInfo)
    {
        return this.http.put<any>(`${environment.api_url}/users/editUser`, userInfo);
    }

}