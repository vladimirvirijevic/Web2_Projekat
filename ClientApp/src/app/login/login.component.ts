import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.loginForm = this.formBuilder.group({
      'username': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  get email() { return this.loginForm.get('email'); }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginInfo = {
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
    }

    alert( JSON.stringify(loginInfo));
  }
}
