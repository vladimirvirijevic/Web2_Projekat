import { Injectable } from '@angular/core';
import { AirplaneCompany } from '../models/airplaneCompany';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirplaneService {
  constructor(
    private http: HttpClient
  ) { }

  private url = 'https://localhost:44347/api/airplanes';

  getCompanies(): Observable<AirplaneCompany[]> {
    return this.http.get<AirplaneCompany[]>(this.url);
  }
}
