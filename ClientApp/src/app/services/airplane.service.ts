import { Injectable } from '@angular/core';
import { AirplaneCompany } from '../models/airplaneCompany';
@Injectable({
  providedIn: 'root'
})
export class AirplaneService {
  companies: AirplaneCompany[] = [ 
    {
      id: 1,
      name: 'Gulf Air',
      address: 'Manama Kingdom of Bahrain',
      description: 'The Kingdom of Bahrains flag carrier, Gulf Air (GF), was founded in 1950 as Gulf Aviation. It prides itself with being one of the first commercial airlines established in the Middle East. ',
      grade: 9.2,
      destinations: ['Australia', 'China', 'USA', 'Serbia', 'Russia']
    }, 
    {
      id: 2,
      name: 'FlyOne',
      address: 'Chisinau, Moldova',
      description: 'Fly One (5F) began operations as a low-cost airline in June 2016. Chisinau International Airport (KIV) is the airlines main base of operations.',
      grade: 8,
      destinations: ['USA', 'China', 'Serbia', 'France']
    }, 
    {
      id: 3,
      name: 'Air China',
      address: 'hunyi District, Beijing',
      description: 'Founded in 1988, Air China (CA) is the nations flag carrier. It operates from hubs at Beijing Capital International Airport (PEK), Chengdu Shuangliu International Airport (CTU) and Shanghai Pudong International Airport (PVG). ',
      grade: 8.8,
      destinations: ['USA', 'Spain', 'Serbia', 'Russia']
    }
  ];

  constructor() { }

  getCompanies(): AirplaneCompany[] {
    return this.companies;
  }
}
