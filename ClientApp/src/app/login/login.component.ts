import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showErrorMessage = false;
  errorMessage = "Wrong login information or account has not been activated yet!";

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { 
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginInfo = {
      email: this.email.value,
      password: this.password.value
    };

    this.authenticationService.login(loginInfo)
        .subscribe(
          data => {
            console.log(data);
            if (data.role === "Admin") {
              this.router.navigate(['/admin/staff']);
            }
            else if (data.role === "AirlineAdmin" || data.role === "RentacarAdmin") {
              if (data.passwordChanged == false) {
                this.router.navigate(['/change-password']);
              }
              this.router.navigate(['/']);
            }
            else {
              this.router.navigate(['/']);
            }
          },
          error => {
            this.showErrorMessage = true;
          }
        );

    //alert( JSON.stringify(loginInfo));
  }
}
