import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MustMatch } from '../helpers/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  showErrorMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    public authService: AuthenticationService
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
            console.log(data);
            this.authService.logout();
            //this.router.navigate(['/profile']);
          },
          error => {
            console.log(error);
            if (error.status == 400) {
              this.showErrorMessage = true;
            }
          }
        );
  }

}
