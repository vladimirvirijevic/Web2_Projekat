import { Component, OnInit } from '@angular/core';
import { RentacarCompany } from '../models/rentacarCompany';
import { RentacarService } from '../services/rentacar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarsComponent } from '../cars/cars.component';
import { Car } from '../models/car';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-rentacar-profile',
  templateUrl: './rentacar-profile.component.html',
  styleUrls: ['./rentacar-profile.component.css']
})
export class RentacarProfileComponent implements OnInit {
  companyId: number;
  company: RentacarCompany;
  searchForm: FormGroup;
  cars: Car[];
  selectedType = "Any";

  showErrorMessage = false;
  errorMessage = "There was an error!"

  constructor(
    private formBuilder: FormBuilder,
    private rentacarService: RentacarService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public authService: AuthenticationService
  ) { 
    this.searchForm = this.formBuilder.group({
      'pickupLocation': ['', [Validators.required]],
      'dropoffLocation': ['', [Validators.required]],
      'pickupDate': ['', [Validators.required]],
      'dropoffDate': ['', [Validators.required]],
      'seats': ['', [Validators.required]]
    });
  }

  get pickupLocation() { return this.searchForm.get('pickupLocation'); }
  get dropoffLocation() { return this.searchForm.get('dropoffLocation'); }
  get pickupDate() { return this.searchForm.get('pickupDate'); }
  get dropoffDate() { return this.searchForm.get('dropoffDate'); }
  get seats() { return this.searchForm.get('seats'); }

  ngOnInit(): void {
    this.companyId = Number(this.route.snapshot.paramMap.get('id'));
    //this.company = this.rentacarService.getCompany(this.companyId);

    this.getCompany();
    this.getCars();
  }

  resetSearch() {
    this.getCars();
  }

  onSubmit() {
    if (this.searchForm.invalid) {
      return;
    }

    const searchInfo = {
      pickupLocation: this.pickupLocation.value,
      dropoffLocation: this.dropoffLocation.value,
      pickupDate: this.pickupDate.value,
      dropoffDate: this.dropoffDate.value,
      seats: this.seats.value,
      type: this.selectedType,
      companyId: this.companyId
    };

    console.log(searchInfo);

    this.rentacarService.searchCars(searchInfo)
      .subscribe(
        data => {
          console.log(data);
          this.cars = data;
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

  getCompany() {
    this.rentacarService.getCompany(this.companyId)
      .subscribe(
        data => {
          console.log(data);
          this.company = data;
        }
      )
  }

  getCars() {
    this.rentacarService.getCars(this.companyId)
      .subscribe(
        data => {
          console.log(data);
          this.cars = data;
        }
      )
  }

  goBack() {
    this.location.back();
  }

  viewCar(carId) {
    this.router.navigate([`/car/${carId}`]);
  }

}
