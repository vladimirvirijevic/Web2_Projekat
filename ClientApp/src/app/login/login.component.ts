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

    this.authenticationService.login(this.email.value, this.password.value)
        .subscribe(
          data => {
            console.log(data);
            if (data.role === "Admin") {
              this.router.navigate(['/admin']);
            }
            else if (data.role === "User") {
              this.router.navigate(['/']);
            }
          },
          error => {
            if (error.status == 400) {
              this.showErrorMessage = true;
              console.log('radi');
            }
            else {
              console.log('ne radi');
            }
          }
        );

    //alert( JSON.stringify(loginInfo));
  }
}
