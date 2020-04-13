import { Injectable } from '@angular/core';
import { RentacarCompany } from '../models/rentacarCompany';

@Injectable({
  providedIn: 'root'
})
export class RentacarService {
  companies: RentacarCompany[] = [
   {
     id: 1,
     name: 'Beograd Rent A Car',
     address: 'Bulevar Oslobodjenja 3',
     description: 'Best Rent A Car Services in Belgrade',
     grade: 9.3,
     cars: ['BMW M3', 'Audi A8', 'Golf 2']
   },
   {
    id: 2,
    name: 'Car Rental NYC',
    address: ' 57 W 53rd St',
    description: 'Best Rent A Car Services in New York',
    grade: 8.1,
    cars: ['Citroen C4', 'Ford Fusion', 'Ford Fiesta']
  },
  {
    id: 3,
    name: 'Enterprise Rent',
    address: 'Bulevar Oslobodjenja 3',
    description: 'Best Rent A Car Services in World',
    grade: 7,
    cars: ['BMW M3', 'Audi A8', 'Golf 2']
  }
  ];


  constructor() { }

  getCompanies(): RentacarCompany[] {
    return this.companies;
  }
}
