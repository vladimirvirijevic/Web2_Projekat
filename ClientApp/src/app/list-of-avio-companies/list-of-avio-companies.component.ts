import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../services/airline.service';
import { AirplaneCompany } from '../models/airplaneCompany';
import { RentacarCompany } from '../models/rentacarCompany';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-avio-companies',
  templateUrl: './list-of-avio-companies.component.html',
  styleUrls: ['./list-of-avio-companies.component.css']
})
export class ListOfAvioCompaniesComponent implements OnInit {
  airplaneCompanies: AirplaneCompany[] = [];
  searchForm: FormGroup;

  constructor(  private formBuilder: FormBuilder,
    private airlineService: AirlineService,
    private router: Router) {
      this.searchForm = this.formBuilder.group({
        'name': [''],
        'location': ['']
      });
     }

     get name() { return this.searchForm.get('name'); }
     get location() { return this.searchForm.get('location'); }
     
  ngOnInit(): void {

    this.getAirplaneCompanies();
   
  }

  getAirplaneCompanies() {
    this.airlineService.getCompanies()
      .subscribe(
        data => {
          this.airplaneCompanies = data;
        }
      )
  }

  onSubmit() {
    if (this.searchForm.invalid) {
      return;
    }

    const searchInfo = {
      name: this.name.value,
      location: this.location.value
    };

    this.airlineService.searchCompanies(searchInfo)
      .subscribe(
        data => {
          this.airplaneCompanies = data;
        }
      )
  }

  resetSearch() {
    this.getAirplaneCompanies();
    this.searchForm.controls.name.setValue("");
    this.searchForm.controls.location.setValue("");
  }

  viewCompany(companyId) {
    this.router.navigate([`/app/listOfAircompanies/${companyId}`]);
  }
  
}
