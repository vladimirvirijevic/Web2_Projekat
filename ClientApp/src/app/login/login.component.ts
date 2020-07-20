import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
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
          },
          error => {
            console.log(error);
          }
        );

    //alert( JSON.stringify(loginInfo));
  }
}
