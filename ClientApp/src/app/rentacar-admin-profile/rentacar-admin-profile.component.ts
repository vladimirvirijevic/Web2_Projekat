import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { AuthUser } from '../models/authUser';
import { MustMatch } from '../helpers/must-match.validator';

@Component({
  selector: 'app-rentacar-admin-profile',
  templateUrl: './rentacar-admin-profile.component.html',
  styleUrls: ['./rentacar-admin-profile.component.css']
})
export class RentacarAdminProfileComponent implements OnInit {
  changePasswordForm: FormGroup;
  admin: AuthUser;

  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService
  ) { 

    this.changePasswordForm = this.formBuilder.group({
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'confirmPassword': ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get password() { return this.changePasswordForm.get('password'); }
   get confirmPassword() { return this.changePasswordForm.get('confirmPassword'); }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      return;
    }


    const passwordInfo = {
      newPassword: this.password.value,
    }

    console.log(passwordInfo);

    this.userService.changePassword(passwordInfo)
        .subscribe(
          data => {
            this.showErrorMessage = false;
            this.showSuccessMessage = true;
            console.log(data);
          },
          error => {
            console.log(error);
            this.showErrorMessage = true;
            this.showSuccessMessage = false;
          }
        );
  }

}
