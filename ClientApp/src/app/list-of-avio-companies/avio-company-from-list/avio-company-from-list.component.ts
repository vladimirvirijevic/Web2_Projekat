import { Component, OnInit } from '@angular/core';
import { AirplaneCompany } from 'src/app/models/airplaneCompany';
import { ActivatedRoute, Router } from '@angular/router';
import { AirlineService } from 'src/app/services/airline.service';

@Component({
  selector: 'app-avio-company-from-list',
  templateUrl: './avio-company-from-list.component.html',
  styleUrls: ['./avio-company-from-list.component.css']
})
export class AvioCompanyFromListComponent implements OnInit {
  company: AirplaneCompany;
  companyId = -1;
  constructor(
    private route: ActivatedRoute,
    private airlineService: AirlineService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.companyId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCompany();
    console.log("blaaaaaaaaaaa");
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
  makeAReservation(flightId)
  {
    this.router.navigate([`/app/reserveFlight/${flightId}`]);
  }


}
