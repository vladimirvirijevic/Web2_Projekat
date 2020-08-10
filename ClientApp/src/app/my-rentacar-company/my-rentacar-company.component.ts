import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AdminService } from '../services/admin.service';
import { RentacarCompany } from '../models/rentacarCompany';

@Component({
  selector: 'app-my-rentacar-company',
  templateUrl: './my-rentacar-company.component.html',
  styleUrls: ['./my-rentacar-company.component.css']
})
export class MyRentacarCompanyComponent implements OnInit {
  company: RentacarCompany;

  companyExists = false;

  constructor(
    private adminService: AdminService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany() {
    const userId = this.authService.currentUserValue.id;

    this.adminService.getMyCompany(userId)
      .subscribe(
        data => {
          this.companyExists = true;
          this.company = data;
        },
        error => {
          this.companyExists = false;
        }
      )
  }
}
