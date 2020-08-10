import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { AuthUser } from 'src/app/models/authUser';
import { MapboxService, Feature } from 'src/app/services/mapbox.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  createUserForm: FormGroup;
  showErrorMessage = false;
  showConfirmation = false;

  staff: AuthUser[] = [];

  errorMessage = "There was an error!";
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private mapboxService: MapboxService
  ) { 
    this.createUserForm = this.formBuilder.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'city': ['', [Validators.required]],
      'phone': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'confirmPassword': ['', Validators.required],
      'role': ['', Validators.required],
    } , {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get lastName() { return this.createUserForm.get('lastName'); }
  get firstName() { return this.createUserForm.get('firstName'); }
  get city() { return this.createUserForm.get('city'); }
  get phone() { return this.createUserForm.get('phone'); }
  get password() { return this.createUserForm.get('password'); }
  get confirmPassword() { return this.createUserForm.get('confirmPassword'); }
  get email() { return this.createUserForm.get('email'); }
  get role() { return this.createUserForm.get('role'); }

  ngOnInit(): void {
    this.getStaff();
  }

  getStaff() {
    this.userService.getStaff()
      .subscribe(
        data => {
          console.log(data);
          this.staff = data;
        }
      )
  }

  submitCreateUser() {
    if (this.createUserForm.invalid) {
      return;
    }

    const newUser = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      city: this.city.value,
      phone: this.phone.value,
      email: this.email.value,
      password: this.password.value,
      role: this.role.value
    }

    this.userService.create(newUser)
      .subscribe(
        data => {
          this.showConfirmation = true;
          this.showErrorMessage = false;
          this.getStaff();
        },
        error => {
          if (error.status == 409) {
              this.showErrorMessage = true;
              this.showConfirmation = false;
              this.errorMessage = "User with the same email already exists!";
          }
          
        }
      )
  }

  // MAPBOX
  addresses: string[] = [];
  selectedAddress = "tets";

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService
        .search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.addresses = features.map(feat => feat.place_name);
        });
      } else {
        this.addresses = [];
      }
  }

  onSelect(address: string) {
    this.selectedAddress = address;
    this.addresses = [];
  }

  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
  }
}
