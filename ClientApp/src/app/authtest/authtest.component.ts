import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterModel } from '../models/registerModel';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-authtest',
  templateUrl: './authtest.component.html',
  styleUrls: ['./authtest.component.css']
})
export class AuthtestComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { 
    this.loginForm = this.formBuilder.group({
      'username': [''],
      'email': [''],
      'password': ['']
    });

    this.registerForm = this.formBuilder.group({
      'firstName': [''],
      'lastName': [''],
      'username': [''],
      'email': [''],
      'password': ['']
    });
  }

  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get email() { return this.registerForm.get('email'); }
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }

  ngOnInit(): void {
  }


  onRegister() {
    const newUser: RegisterModel = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      username: this.username.value,
      password: this.password.value,
      email: this.email.value
    };

    this.userService.register(newUser)
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
          }
        );
    }
}

