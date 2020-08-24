import { Component, OnInit } from '@angular/core';
import { AirplaneCompany } from 'src/app/models/airplaneCompany';
import { ActivatedRoute } from '@angular/router';
import { AirlineService } from 'src/app/services/airline.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-airline-company',
  templateUrl: './airline-company.component.html',
  styleUrls: ['./airline-company.component.css']
})
export class AirlineCompanyComponent implements OnInit {
  company: AirplaneCompany;
  companyId = -1;
  

  constructor(
    private route: ActivatedRoute,
    private airlineService: AirlineService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.companyId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCompany();
  }

  getCompany() {
    if (this.companyId == -1) {
      return;
    }

    this.airlineService.getCompany(this.companyId)
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
