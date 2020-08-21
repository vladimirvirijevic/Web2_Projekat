import { Component, OnInit } from '@angular/core';
import { RentacarAdminService } from 'src/app/services/rentacar-admin.service';
import { RentacarEarning } from 'src/app/models/rentacarEarning';

@Component({
  selector: 'app-rentacar-earnings',
  templateUrl: './rentacar-earnings.component.html',
  styleUrls: ['./rentacar-earnings.component.css']
})
export class RentacarEarningsComponent implements OnInit {
  selectedDay: string = "";
  dailyEarnings: RentacarEarning = new RentacarEarning();

  constructor(
    private rentacarAdminService: RentacarAdminService
  ) {
    this.dailyEarnings.totalEarning = 0;
    this.dailyEarnings.reservations = [];
   }

  ngOnInit(): void {
  }

  getDailyEarnings() {
    if (this.selectedDay == "") {
      return;
    }

    this.rentacarAdminService.getDailyEarnings(this.selectedDay)
      .subscribe(
        data => {
          this.dailyEarnings = data;
          console.log(data);
        }
      )
  }
}
