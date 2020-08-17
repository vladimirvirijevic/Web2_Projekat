import { Component, OnInit } from '@angular/core';
import { RentacarService } from '../services/rentacar.service';
import { RentacarCompany } from '../models/rentacarCompany';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  searchForm: FormGroup;
  companies: RentacarCompany[] = [];

  showErrorMessage = false;
  errorMessage = "There was an error!"

  constructor(
    private formBuilder: FormBuilder,
    private rentacarService: RentacarService,
    private router: Router
  ) {
    this.searchForm = this.formBuilder.group({
      'name': [''],
      'location': [''],
      'pickupDate': ['', [Validators.required]],
      'dropoffDate': ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.getCompanies();
  }

  get name() { return this.searchForm.get('name'); }
  get location() { return this.searchForm.get('location'); }
  get pickupDate() { return this.searchForm.get('pickupDate'); }
  get dropoffDate() { return this.searchForm.get('dropoffDate'); }

  onSubmit() {
    if (this.searchForm.invalid) {
      return;
    }

    const searchInfo = {
      name: this.name.value,
      location: this.location.value,
      pickupDate: this.pickupDate.value,
      dropoffDate: this.dropoffDate.value,
    };

    console.log(searchInfo);

    this.rentacarService.searchCompanies(searchInfo)
      .subscribe(
        data => {
          console.log(data);
          this.companies = data;
          this.showErrorMessage = false;
        },
        error => {
          this.showErrorMessage = true;

          if (error.status == 409) {
            this.errorMessage = "Pick up date is greater then Drop off date"!
          }
          else if (error.status == 404) {
            this.errorMessage = "You must enter either service name or service location"!
          }
        }
      )
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
