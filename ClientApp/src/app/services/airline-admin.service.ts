import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirlineAdminService {

  constructor(  private http: HttpClient) {
  
   }

  editCompany(companyId, companyInfo)
  {
    return this.http.put<any>(`${environment.api_url}/airlineadmin/editCompany/${companyId}`, companyInfo);
  }


}
