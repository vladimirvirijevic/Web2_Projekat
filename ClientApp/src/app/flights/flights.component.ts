import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../services/airline.service';
import { AirplaneCompany } from '../models/airplaneCompany';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Flight } from '../models/Flight';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  searchForm: FormGroup;
  flights: Flight[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private airlineService: AirlineService
  ) {
    this.searchForm = this.formBuilder.group({
      'from': ['', [Validators.required]],
      'to': ['', [Validators.required]],
      'takeoffDate': ['', [Validators.required]],
      'landingDate': ['', [Validators.required]]
    });
  }

  get from() { return this.searchForm.get('from'); }
  get to() { return this.searchForm.get('to'); }
  get takeoffDate() { return this.searchForm.get('takeoffDate'); }
  get landingDate() { return this.searchForm.get('landingDate'); }

  ngOnInit(): void {
    this.getFlights();
  }

  getFlights() {
    this.airlineService.getFlights()
      .subscribe(
        data => {
          console.log(data);
          this.flights = data;
        }
      )
  }

  onSubmit() {
    if (this.searchForm.invalid) {
      return;
    }

    const searchInfo = {
      from: this.from.value,
      to: this.to.value,
      takeoffDate: this.takeoffDate.value,
      landingDate: this.landingDate.value
    };    

    this.airlineService.searchFlights(searchInfo)
      .subscribe(
        data => {
          console.log(data);
          this.flights = data;
        }
      )
  }

  resetSearch() {
    this.getFlights();

    this.searchForm.controls.from.setValue("");
    this.searchForm.controls.to.setValue("");
    this.searchForm.controls.takeoffDate.setValue("");
    this.searchForm.controls.landingDate.setValue("");
  }
}
