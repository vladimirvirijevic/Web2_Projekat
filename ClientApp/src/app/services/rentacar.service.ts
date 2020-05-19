import { Injectable } from '@angular/core';
import { RentacarCompany } from '../models/rentacarCompany';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentacarService {
  /*
  companies: RentacarCompany[] = [
   {
     id: 1,
     name: 'Beograd Rent A Car',
     address: 'Bulevar Oslobodjenja 3',
     description: 'Best Rent A Car Services in Belgrade',
     grade: 9.3,
     cars: [
      {
        id: 1,
        model: 'Honda CR-V',
        type: 'SUV',
        seats: 5,
        price: 15
      },
      {
        id: 1,
        model: 'Audi Q5',
        type: 'SUV',
        seats: 5,
        price: 11
      },
      {
        id: 1,
        model: 'Toyota Sienna',
        type: 'Van',
        seats: 8,
        price: 15
      },
      {
        id: 1,
        model: 'Opel Insignia',
        type: 'Sedan',
        seats: 5,
        price: 20
      },
      {
        id: 1,
        model: 'Opel Astra',
        type: 'Sedan',
        seats: 5,
        price: 21
      }
    ]
   },
   {
    id: 2,
    name: 'Car Rental NYC',
    address: ' 57 W 53rd St',
    description: 'Best Rent A Car Services in New York',
    grade: 8.1,
    cars: [
      {
        id: 1,
        model: 'Honda CR-V',
        type: 'SUV',
        seats: 5,
        price: 33
      },
      {
        id: 1,
        model: 'Audi Q5',
        type: 'SUV',
        seats: 5,
        price: 45
      },
      {
        id: 1,
        model: 'Toyota Sienna',
        type: 'Van',
        seats: 8,
        price: 33
      }
    ]
  },
  {
    id: 3,
    name: 'Enterprise Rent',
    address: 'Bulevar Oslobodjenja 3',
    description: 'Best Rent A Car Services in World',
    grade: 7,
    cars: [
      {
        id: 1,
        model: 'Audi A4',
        type: 'Sedan',
        seats: 5,
        price: 12
      },
      {
        id: 1,
        model: 'BMW M3',
        type: 'Sedan',
        seats: 5,
        price: 6
      },
      {
        id: 1,
        model: 'Golf 2',
        type: 'Sedan',
        seats: 5,
        price: 119
      }
    ]
  }
  ];
  */

  private url = 'https://localhost:44347/api';

  constructor(
    private http: HttpClient
  ) { }
  
  getCompanies(): Observable<RentacarCompany[]> {
    return this.http.get<RentacarCompany[]>(this.url + '/rentacar');
  }

  getCompany(id): Observable<RentacarCompany> {
    return this.http.get<RentacarCompany>(this.url + `/rentacar/${id}`);
  }
  /*

  getCompanies(): RentacarCompany[] {
    return this.companies;
  }

  getCompany(id): RentacarCompany {
    return this.companies.filter(x => x.id == id)[0];
  }
  */
}
