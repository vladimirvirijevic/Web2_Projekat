import { Component, OnInit } from '@angular/core';
import { RentacarService } from '../services/rentacar.service';
import { RentacarCompany } from '../models/rentacarCompany';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  companies: RentacarCompany[] = [];

  constructor(
    private rentacarService: RentacarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.rentacarService.getCompanies()
      .subscribe(
        data => {
          console.log(data);
          this.companies = data;
        }
      )
  }

  viewCompany(companyId) {
    this.router.navigate([`/rentacar/${companyId}`]);
  }


}
