import { Component, OnInit } from '@angular/core';
import { RentacarCompany } from '../models/rentacarCompany';
import { RentacarService } from '../services/rentacar.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rentacar-profile',
  templateUrl: './rentacar-profile.component.html',
  styleUrls: ['./rentacar-profile.component.css']
})
export class RentacarProfileComponent implements OnInit {
  companyId: number;
  company: RentacarCompany;

  constructor(
    private rentacarService: RentacarService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.companyId = Number(this.route.snapshot.paramMap.get('id'));
    //this.company = this.rentacarService.getCompany(this.companyId);

    this.getCompany();
  }

  getCompany() {
    this.rentacarService.getCompany(this.companyId)
      .subscribe(
        data => {
          console.log(data);
          this.company = data;
        }
      )
  }

  goBack() {
    this.location.back();
  }

}
