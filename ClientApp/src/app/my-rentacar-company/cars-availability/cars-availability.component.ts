import { Component, OnInit } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { RentacarEarning } from 'src/app/models/rentacarEarning';
import { RentacarAdminService } from 'src/app/services/rentacar-admin.service';
import { Stats } from 'src/app/models/stats';

@Component({
  selector: 'app-cars-availability',
  templateUrl: './cars-availability.component.html',
  styleUrls: ['./cars-availability.component.css']
})
export class CarsAvailabilityComponent implements OnInit {
  selectedDay: string = "";
  selectedWeek: string = "";
  selectedMonth: string = "";

  weeklyStats: Stats;

  constructor(
    private rentacarAdminService: RentacarAdminService
  ) {
    
   }

  ngOnInit() {
  }

  getWeeklyStats() {
    if (this.selectedWeek == "") {
      return;
    }

    this.rentacarAdminService.getWeeklyStats(this.selectedWeek)
      .subscribe(
        data => {
          console.log(data);
          this.weeklyStats = data;
          this.setWeeklyChart(this.weeklyStats);
        }
      )
  }

  setWeeklyChart(data) {
    this.barChartOptions = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: { xAxes: [{}], yAxes: [{}] },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };

    this.barChartLabels = data.dates;
    this.barChartData = [
      { data: data.reservationsCount, label: 'Reserved Cars' }
    ];
  }


  public barChartOptions: ChartOptions = null;
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = null;

  

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }


}
