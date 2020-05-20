import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterModel } from '../models/registerModel';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    register(user: RegisterModel) {
        return this.http.post<any>(`${environment.api_url}/users/register`, user);
    }

    changeUsername(userInfo) {
        return this.http.put<any>(`${environment.api_url}/users/changeusername`, userInfo);
    }

    changePassword(userInfo) {
        return this.http.put<any>(`${environment.api_url}/users/changepassword`, userInfo);
    }
}