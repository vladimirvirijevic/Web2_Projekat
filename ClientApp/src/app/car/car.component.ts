import { Component, OnInit } from '@angular/core';
import { RentacarService } from '../services/rentacar.service';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../models/car';
import { Location } from '@angular/common';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  carId: number;
  car: Car;

  constructor(
    private rentacarService: RentacarService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.carId = Number(this.route.snapshot.paramMap.get('id'));
    //this.company = this.rentacarService.getCompany(this.companyId);

    this.getCompany(this.carId);
  }

  getCompany(carId) {
    this.rentacarService.getCar(carId)
      .subscribe(
        data => {
          console.log(data);
          this.car = data;
        }
      )
  }

  goBack() {
    this.location.back();
  }

}
