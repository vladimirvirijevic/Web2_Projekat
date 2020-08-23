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
  selectedWeek: string = "";
  selectedMonth: string = "";

  dailyEarnings: RentacarEarning = new RentacarEarning();
  weeklyEarnings: RentacarEarning = new RentacarEarning();
  monthlyEarnings: RentacarEarning = new RentacarEarning();

  constructor(
    private rentacarAdminService: RentacarAdminService
  ) {
    this.dailyEarnings.totalEarning = 0;
    this.dailyEarnings.reservations = [];

    this.weeklyEarnings.totalEarning = 0;
    this.weeklyEarnings.reservations = [];

    this.monthlyEarnings.totalEarning = 0;
    this.monthlyEarnings.reservations = [];
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

  getWeeklyEarnings() {
    if (this.selectedWeek == "") {
      return;
    }

    this.rentacarAdminService.getWeeklyEarnings(this.selectedWeek)
      .subscribe(
        data => {
          this.weeklyEarnings = data;
          console.log(data);
        }
      )
  }

  getMonthlyEarnings() {
    if (this.selectedMonth == "") {
      return;
    }

    this.rentacarAdminService.getMonthlyEarnings(this.selectedMonth)
      .subscribe(
        data => {
          this.monthlyEarnings = data;
          console.log(data);
        }
      )
  }
}
