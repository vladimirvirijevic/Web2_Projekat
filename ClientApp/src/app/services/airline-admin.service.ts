import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Flight } from '../models/Flight';

@Injectable({
  providedIn: 'root'
})
export class AirlineAdminService {

  constructor(  private http: HttpClient) {
  
   }

   //editovanje profila kompanije
  editCompany(companyId, companyInfo)
  {
    return this.http.put<any>(`${environment.api_url}/airlineadmin/editCompany/${companyId}`, companyInfo);
  }
  //destinacije poslovanja
  //vraca destinacije na kojima posluje avioKompanija
  getLocations(companyId):Observable<Location[]>
  {
    return this.http.get<Location[]>(`${environment.api_url}/airlineadmin/getLocations/${companyId}`);
  }
  //dodavanje lokacije sa id-jem kompanije
  addLocation(companyId, locationInfo)
  {
    return this.http.post<any>(`${environment.api_url}/airlineadmin/addLocation/${companyId}`,locationInfo);
  }
  //brisanje lokacije sa odredjenim id-iem
  deleteLocation(locationId)
  {
    return this.http.delete<any>(`${environment.api_url}/airlineadmin/deleteLocation/${locationId}`);
  }
  //letovi
  //dodavanje letova
  addFlight(companyId, flightInfo)
  {
    return this.http.post<any>(`${environment.api_url}/airlineadmin/addFlight/${companyId}`, flightInfo);
  }
  //dobavljanje letova za prikaz
  getFlights(companyId)
  {
    return this.http.get<Flight[]>(`${environment.api_url}/airlineadmin/getFlights/${companyId}`);
  }
  deleteFlight(flightId):Observable<Flight[]>
  {
    return this.http.delete<any>(`${environment.api_url}/airlineadmin/deleteFlight/${flightId}`);
  }

  //za sedista
  //kreiranje sedista
  createSeat(flightId, seatInfo)
  {
    return this.http.post<any>(`${environment.api_url}/airlineadmin/createSeat/${flightId}`,seatInfo);
  }




}
